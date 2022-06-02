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
exports.ChangeStatusAppointmentDto = exports.CreateAppointmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const status_appointment_enum_1 = require("../enums/status-appointment.enum");
class CreateAppointmentDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "id_patient", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "id_user", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAppointmentDto.prototype, "id_record", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "description", void 0);
exports.CreateAppointmentDto = CreateAppointmentDto;
class ChangeStatusAppointmentDto extends (0, mapped_types_1.PartialType)(CreateAppointmentDto) {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangeStatusAppointmentDto.prototype, "status", void 0);
exports.ChangeStatusAppointmentDto = ChangeStatusAppointmentDto;
//# sourceMappingURL=appointment.dto.js.map