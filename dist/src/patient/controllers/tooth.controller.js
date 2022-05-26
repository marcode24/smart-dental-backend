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
exports.ToothController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const parse_int_pipe_1 = require("../../common/parse-int.pipe");
const tooth_dto_1 = require("../dtos/tooth.dto");
const tooth_service_1 = require("../services/tooth.service");
let ToothController = class ToothController {
    constructor(toothService) {
        this.toothService = toothService;
    }
    create(payload) {
        return this.toothService.create(payload);
    }
    findByPatient(patientId) {
        return this.toothService.findByPatient(patientId);
    }
    update(toothId, payload) {
        return this.toothService.update(toothId, payload);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tooth_dto_1.CreateToothDto]),
    __metadata("design:returntype", void 0)
], ToothController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ToothController.prototype, "findByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Patch)('/:toothId'),
    __param(0, (0, common_1.Param)('toothId', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tooth_dto_1.UpdateToothDto]),
    __metadata("design:returntype", void 0)
], ToothController.prototype, "update", null);
ToothController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('teeth'),
    __metadata("design:paramtypes", [tooth_service_1.ToothService])
], ToothController);
exports.ToothController = ToothController;
//# sourceMappingURL=tooth.controller.js.map