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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDetail = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const record_entity_1 = require("../../patient/entities/record.entity");
const appointment_entity_1 = require("./appointment.entity");
let AppointmentDetail = class AppointmentDetail extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "id_appointment_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => appointment_entity_1.Appointment),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "id_appointment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => record_entity_1.Record),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "id_record", void 0);
AppointmentDetail = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: 'appointment_detail', initialAutoIncrement: '1' })
], AppointmentDetail);
exports.AppointmentDetail = AppointmentDetail;
//# sourceMappingURL=appointment-detail.entity.js.map