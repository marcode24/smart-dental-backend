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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const appointment_detail_entity_1 = require("../entities/appointment-detail.entity");
const appointment_entity_1 = require("../entities/appointment.entity");
const record_entity_1 = require("../../patient/entities/record.entity");
const patient_entity_1 = require("../../patient/entities/patient.entity");
const status_appointment_enum_1 = require("../enums/status-appointment.enum");
let AppointmentService = class AppointmentService {
    constructor(appointmentModel, appointmentDetailModel) {
        this.appointmentModel = appointmentModel;
        this.appointmentDetailModel = appointmentDetailModel;
    }
    async create(data) {
        const { id_record, date } = data;
        data.date = date.split('T')[0];
        const { id_appointment } = await this.appointmentModel.create(Object.assign({}, data));
        id_record.forEach(async (id_record) => {
            await this.appointmentDetailModel.create({ id_appointment, id_record: id_record });
        });
        return true;
    }
    async findByPatient(patientId, status) {
        status = status || status_appointment_enum_1.StatusAppointment.PENDING;
        const optionsQuery = {
            where: {
                status,
                id_patient: patientId,
            },
            include: [record_entity_1.Record, patient_entity_1.Patient]
        };
        return this.appointmentModel.findAll(optionsQuery);
    }
    async findByUser(id_user, status, optionsParams) {
        status = status || status_appointment_enum_1.StatusAppointment.PENDING;
        let { limit, offset, fullname, date } = optionsParams;
        limit = Number(limit) || 5;
        offset = Number(offset) || 0;
        let optionsQuery = {
            where: {
                status,
                id_user,
            },
            include: [record_entity_1.Record, patient_entity_1.Patient],
            limit,
            offset,
        };
        let optionsQueryCount = { where: { status, id_user } };
        if (fullname) {
            const search = `%${fullname.toString().trim()}%`;
            optionsQuery = {
                where: Object.assign({}, optionsQuery.where),
                include: [
                    record_entity_1.Record,
                    {
                        model: patient_entity_1.Patient,
                        where: {
                            [sequelize_2.Op.or]: {
                                name: { [sequelize_2.Op.like]: search },
                                last_name: { [sequelize_2.Op.like]: search },
                            },
                        }
                    }
                ]
            };
            return { appointments: await this.appointmentModel.findAll(optionsQuery) };
        }
        if (date) {
            optionsQuery = Object.assign(Object.assign({}, optionsQuery), { where: Object.assign(Object.assign({}, optionsQuery.where), { date: {
                        [sequelize_2.Op.gte]: date,
                        [sequelize_2.Op.lte]: date
                    } }) });
            const { limit, offset, include } = optionsQuery, rest = __rest(optionsQuery, ["limit", "offset", "include"]);
            optionsQueryCount = Object.assign({}, rest);
        }
        const [appointments, total] = await Promise.all([
            this.appointmentModel.findAll(optionsQuery),
            this.appointmentModel.count(optionsQueryCount),
        ]);
        return { appointments, total };
    }
    async changeStatus(id_appointment, data) {
        const appointmentFound = await this.appointmentModel.findByPk(id_appointment);
        if (!appointmentFound) {
            return new common_1.NotFoundException(`appointment not found with id ${id_appointment}`);
        }
        appointmentFound.status = data.status;
        return await appointmentFound.save();
    }
};
AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(appointment_entity_1.Appointment)),
    __param(1, (0, sequelize_1.InjectModel)(appointment_detail_entity_1.AppointmentDetail)),
    __metadata("design:paramtypes", [Object, Object])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map