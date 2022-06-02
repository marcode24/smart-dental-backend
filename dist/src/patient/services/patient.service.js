"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const familiar_entity_1 = require("../entities/familiar.entity");
const patient_entity_1 = require("../entities/patient.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const familiar_service_1 = require("./familiar.service");
let PatientService = class PatientService {
    constructor(patientModel, userModel, familiarService) {
        this.patientModel = patientModel;
        this.userModel = userModel;
        this.familiarService = familiarService;
        this.optionsQuery = {
            include: [
                {
                    model: user_entity_1.User,
                    attributes: ['id_user', 'name', 'last_name', 'image']
                },
                {
                    model: familiar_entity_1.Familiar
                }
            ],
        };
    }
    async create(data) {
        const { id_familiar } = await this.familiarService.create(Object.assign({}, data.familiar));
        data.id_familiar = id_familiar;
        const patientCreated = await this.patientModel.create(Object.assign({}, data));
        return patientCreated;
    }
    async findById(patientId) {
        const patientDb = await this.patientModel.findByPk(patientId, this.optionsQuery);
        if (!patientDb) {
            return new common_1.NotFoundException(`patient not found with id ${patientId}`);
        }
        return patientDb;
    }
    async findbyUserAndPatient(userID, patientID, isAdmin = false) {
        const optionQuery = {
            where: {
                id_patient: patientID,
                id_user: userID,
            },
            include: [
                {
                    model: familiar_entity_1.Familiar
                },
                {
                    model: user_entity_1.User,
                    attributes: ['id_user', 'name', 'last_name', 'image']
                }
            ]
        };
        (isAdmin) ? delete optionQuery.where['id_user'] : '';
        const patientFound = await this.patientModel.findOne(optionQuery);
        if (!patientFound) {
            return new common_1.BadRequestException('You do not have access for this patient');
        }
        return { patient: patientFound };
    }
    async findAll(params) {
        const optionsQuery = this.getOptionsQuery(params, true);
        return this.findPatients(optionsQuery);
    }
    async findByUser(userId, params) {
        const optionsQuery = this.getOptionsQuery(params, false, userId);
        return this.findPatients(optionsQuery, userId);
    }
    async findPatients(optionsQuery, id_user) {
        let optionQueryActive = { where: { status: true } };
        let optionQueryInactive = { where: { status: false } };
        if (id_user) {
            optionQueryActive = { where: { id_user, status: true } };
            optionQueryInactive = { where: { id_user, status: false } };
        }
        const [patients, totalActive, totalInactive] = await Promise.all([
            this.patientModel.findAll(optionsQuery),
            this.patientModel.count(optionQueryActive),
            this.patientModel.count(optionQueryInactive),
        ]);
        const data = { patients, totalActive, totalInactive };
        return data;
    }
    getOptionsQuery(params, isAdmin, userId) {
        const { fullname } = params;
        if (fullname) {
            const search = `%${fullname.toString()}%`;
            this.optionsQuery = Object.assign(Object.assign({}, this.optionsQuery), { where: {
                    id_user: userId,
                    [sequelize_2.Op.or]: {
                        name: { [sequelize_2.Op.like]: search },
                        last_name: { [sequelize_2.Op.like]: search },
                    },
                } });
        }
        else {
            const { limit, offset } = params;
            this.optionsQuery = Object.assign(Object.assign({}, this.optionsQuery), { where: {
                    id_user: userId
                }, limit,
                offset });
        }
        (isAdmin) ? delete this.optionsQuery.where['id_user'] : '';
        return this.optionsQuery;
    }
    async changeUser(patientId, newUserId) {
        const userFound = await this.userModel.findByPk(newUserId, {
            attributes: ['id_user']
        });
        if (!userFound) {
            return new common_1.NotFoundException(`user not found with id: ${newUserId}`);
        }
        return await this.patientModel.update({
            id_user: userFound.id_user,
        }, {
            where: {
                id_patient: patientId
            }
        });
    }
    async update(patientID, familiarID, changes) {
        const { familiar: familiarChanges } = changes, infoPatient = __rest(changes, ["familiar"]);
        return await Promise.all([
            this.patientModel.update(infoPatient, { where: { id_patient: patientID } }),
            this.familiarService.update(familiarID, familiarChanges),
        ]);
    }
    async setStatusPatient(patientId, value) {
        const status = Boolean(value);
        return await this.patientModel.update({ status }, { where: { id_patient: patientId } });
    }
};
PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(patient_entity_1.Patient)),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, Object, familiar_service_1.FamiliarService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map