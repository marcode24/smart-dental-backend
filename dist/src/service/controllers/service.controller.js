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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const parse_int_pipe_1 = require("../../common/parse-int.pipe");
const service_dto_1 = require("../dtos/service.dto");
const services_service_1 = require("../services/services.service");
let ServicesController = class ServicesController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    create(payload) {
        return this.serviceService.create(payload);
    }
    findAll(name, limit, offset) {
        return this.serviceService.findAll(name, limit, offset);
    }
    findByFilter(odontogram) {
        const value = JSON.parse(odontogram);
        return this.serviceService.findByFilter(value);
    }
    findById(serviceId) {
        return this.serviceService.findById(serviceId);
    }
    changeStatus(serviceId, status) {
        return this.serviceService.changeStatus(serviceId, status);
    }
    update(serviceId, payload) {
        return this.serviceService.update(serviceId, payload);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('offset', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('odontogram')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findByFilter", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findById", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "changeStatus", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
ServicesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=service.controller.js.map