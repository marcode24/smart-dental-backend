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
exports.RecordController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const parse_int_pipe_1 = require("../../common/parse-int.pipe");
const record_dto_1 = require("../dtos/record.dto");
const record_service_1 = require("../services/record.service");
let RecordController = class RecordController {
    constructor(recordService) {
        this.recordService = recordService;
    }
    create(payload) {
        return this.recordService.create(payload);
    }
    changeStatus(recordId, newStatus) {
        return this.recordService.changeStatus(recordId, newStatus);
    }
    getStatistics(limit) {
        return this.recordService.statistics(limit);
    }
    getStatisticsDate(limit, offset, type, option) {
        const params = { limit, offset, type, option };
        return this.recordService.statisticsByDate(params);
    }
    findByPatient(patientId, filter) {
        return this.recordService.findByPatient(patientId, filter);
    }
    updateRecord(recordId, payload) {
        return this.recordService.update(recordId, payload);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_dto_1.CreateRecordDto]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Patch)('/:recordId'),
    __param(0, (0, common_1.Param)('recordId', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "changeStatus", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Get)('/statistics'),
    __param(0, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "getStatistics", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Get)('/statistics/date'),
    __param(0, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('offset', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('option')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "getStatisticsDate", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('/:patientId'),
    __param(0, (0, common_1.Param)('patientId', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('filter', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "findByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Patch)('/update/:recordId'),
    __param(0, (0, common_1.Param)('recordId', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, record_dto_1.UpdateRecordDto]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "updateRecord", null);
RecordController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('records'),
    __metadata("design:paramtypes", [record_service_1.RecordService])
], RecordController);
exports.RecordController = RecordController;
//# sourceMappingURL=record.controller.js.map