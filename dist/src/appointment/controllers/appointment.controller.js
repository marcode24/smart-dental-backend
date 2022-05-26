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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const parse_int_pipe_1 = require("../../common/parse-int.pipe");
const appointment_dto_1 = require("../dtos/appointment.dto");
const status_appointment_enum_1 = require("../enums/status-appointment.enum");
const appointment_service_1 = require("../services/appointment.service");
let AppointmentController = class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    create(payload) {
        return this.appointmentService.create(payload);
    }
    findByPatient(patientID, status) {
        return this.appointmentService.findByPatient(patientID, status);
    }
    findByUser(userID, status, date, limit, offset, fullname) {
        let newDate;
        let optionsParams = { limit, offset, fullname };
        if (date) {
            newDate = date.toISOString().split('T')[0];
            optionsParams.date = newDate;
        }
        return this.appointmentService.findByUser(userID, status, optionsParams);
    }
    changeStatus(appointmentID, payload) {
        return this.appointmentService.changeStatus(appointmentID, payload);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/patient/:patientID'),
    __param(0, (0, common_1.Param)('patientID', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/user/:userID'),
    __param(0, (0, common_1.Param)('userID', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('date')),
    __param(3, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('offset', parse_int_pipe_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('fullname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Date, Number, Number, String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findByUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Patch)('/:appointmentID'),
    __param(0, (0, common_1.Param)('appointmentID', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, appointment_dto_1.ChangeStatusAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "changeStatus", null);
AppointmentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map