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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const get_current_user_id_decorator_1 = require("../decorators/get-current-user-id.decorator");
const public_decorator_1 = require("../decorators/public.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_enum_1 = require("../enums/roles.enum");
const user_service_1 = require("../../user/services/user.service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login(req) {
        return this.authService.generateJWT(req.user);
    }
    async validateCode(code) {
        const isValid = await this.userService.validateCode(code);
        return { valid: isValid };
    }
    refreshTokens(userId) {
        return this.authService.renewToken(userId);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateCode", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DENTIST),
    (0, common_1.Get)('renew'),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
AuthController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map