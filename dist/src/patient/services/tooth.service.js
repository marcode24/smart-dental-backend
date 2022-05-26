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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToothService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const status_enum_1 = require("../enums/status.enum");
const service_entity_1 = require("../../service/entities/service.entity");
const record_entity_1 = require("../entities/record.entity");
const tooth_entity_1 = require("../entities/tooth.entity");
const record_service_1 = require("./record.service");
let ToothService = class ToothService {
    constructor(toothModel, recordService) {
        this.toothModel = toothModel;
        this.recordService = recordService;
    }
    async create(data) {
        const createRecord = Object.assign(Object.assign({}, data), { quantity: 1 });
        const recordCreated = await this.recordService.create(createRecord);
        const newTooth = new this.toothModel(data);
        newTooth.id_record = recordCreated.id_record;
        return await newTooth.save();
    }
    async findByPatient(patientId) {
        const optionsQuery = {
            where: {
                id_patient: patientId,
            },
            include: [
                {
                    model: record_entity_1.Record,
                    where: {
                        status: status_enum_1.Status.PENDING,
                    },
                    include: [
                        {
                            model: service_entity_1.Service
                        }
                    ]
                }
            ]
        };
        return await this.toothModel.findAll(optionsQuery);
    }
    async update(toothId, data) {
        const toothFound = await this.toothModel.findByPk(toothId, {
            include: [{
                    model: record_entity_1.Record,
                }]
        });
        if (!toothFound) {
            return new common_1.NotFoundException(`tooth not found with id: ${toothId}`);
        }
        const { id_service, distal, ligual, mesial, oclusal, vestibular } = data;
        if (toothFound.record.id_service !== id_service) {
            const payloadRecord = { id_service, quantity: 1 };
            const { id_record } = toothFound;
            await this.recordService.update(id_record, payloadRecord);
        }
        toothFound.distal = distal || false;
        toothFound.ligual = ligual || false;
        toothFound.mesial = mesial || false;
        toothFound.oclusal = oclusal || false;
        toothFound.vestibular = vestibular || false;
        return await toothFound.save();
    }
};
ToothService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tooth_entity_1.Tooth)),
    __metadata("design:paramtypes", [Object, record_service_1.RecordService])
], ToothService);
exports.ToothService = ToothService;
//# sourceMappingURL=tooth.service.js.map