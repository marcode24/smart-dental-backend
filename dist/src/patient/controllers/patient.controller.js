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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const parse_int_pipe_1 = require("../../common/parse-int.pipe");
const patient_dto_1 = require("../dtos/patient.dto");
const patient_service_1 = require("../services/patient.service");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    findAll(name, limit, offset) {
        const optionsParams = { fullname: name, limit, offset };
        return this.patientService.findAll(optionsParams);
    }
    findById(patientId) {
        return this.patientService.findById(patientId);
    }
    findByUserAndPatient(patientId, userId, isAdmin) {
        return this.patientService.findbyUserAndPatient(userId, patientId, (isAdmin === 'true'));
    }
    findByUser(userId, name, limit, offset) {
        const optionsParams = { fullname: name, limit, offset };
        return this.patientService.findByUser(userId, optionsParams);
    }
    create(payload) {
        return this.patientService.create(payload);
    }
    changeUser(patientId, newUserId) {
        return this.patientService.changeUser(patientId, newUserId);
    }
    changeStatus(patientId, status) {
        return this.patientService.setStatusPatient(patientId, status);
    }
    update(patientID, familiarID, payload) {
        return this.patientService.update(patientID, familiarID, payload);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('offset', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findById", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('patient/:patientId/user/:userId'),
    __param(0, (0, common_1.Param)('patientId', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('isAdmin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findByUserAndPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/:idUser'),
    __param(0, (0, common_1.Param)('idUser', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('offset', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findByUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Patch)('/:idPatient/newUser/:idUser'),
    __param(0, (0, common_1.Param)('idPatient', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('idUser', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "changeUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "changeStatus", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Put)('/:idPatient/:idFamiliar'),
    __param(0, (0, common_1.Param)('idPatient', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('idFamiliar', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "update", null);
PatientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map