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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const sequelize_2 = require("sequelize");
const user_entity_1 = require("../entities/user.entity");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const auth_service_1 = require("../../auth/services/auth.service");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    generateCode() {
        const head = Date.now().toString(36).substring(3);
        const tail = Math.random().toString(36).substring(9);
        return head + tail;
    }
    async create(data) {
        const { role } = data;
        if (role === roles_enum_1.Role.ADMIN) {
            data.code = this.generateCode();
        }
        const newModel = new this.userModel(data);
        const { username } = newModel;
        if (await this.validateUserUnique(username)) {
            return new common_1.BadRequestException('username already in use');
        }
        const hashPassword = await bcrypt.hash(newModel.password, 10);
        newModel.password = hashPassword;
        const modelSaved = await newModel.save();
        const _a = modelSaved.toJSON(), { password } = _a, response = __rest(_a, ["password"]);
        return this.authService.generateJWT(modelSaved);
    }
    async validateCode(code) {
        const userFound = await this.userModel.findOne({
            where: { code },
            attributes: ['code', 'role']
        });
        if (!userFound) {
            return false;
        }
        return userFound.get({ plain: true }).role === roles_enum_1.Role.ADMIN;
    }
    async validateUserUnique(username) {
        const usersFound = await this.userModel.findOne({ where: { username } });
        return usersFound ? true : false;
    }
    async findAll(optionsParams) {
        const { fullname, limit, offset, all } = optionsParams;
        let options = {};
        if (all) {
            options = {
                attributes: ['id_user', 'name', 'last_name', 'image'],
                where: {
                    status: true,
                }
            };
        }
        else {
            const newLimit = Number(limit) || 5;
            const newOffset = Number(offset) || 0;
            options = {
                attributes: { exclude: ['password'] },
                limit: newLimit,
                offset: newOffset,
            };
            if (fullname) {
                const search = `%${fullname.toString()}%`;
                const { attributes } = options;
                options = {
                    attributes,
                    where: {
                        [sequelize_2.Op.or]: {
                            name: { [sequelize_2.Op.like]: search },
                            last_name: { [sequelize_2.Op.like]: search },
                        },
                    },
                };
            }
        }
        const [users, totalAdmin, totalUser] = await Promise.all([
            this.userModel.findAll(options),
            this.userModel.count({ where: { role: roles_enum_1.Role.ADMIN } }),
            this.userModel.count({ where: { role: roles_enum_1.Role.DENTIST } }),
        ]);
        const data = { users, totalAdmin, totalUser };
        return data;
    }
    async findById(userId) {
        const userFound = await this.userModel.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        return { user: userFound };
    }
    async setStatusUser(userId, value) {
        const setValue = Boolean(value);
        const userDB = await this.userModel.findByPk(userId, {
            attributes: ['id_user', 'status']
        });
        userDB.status = setValue;
        return await userDB.save();
    }
    async update(userId, changes) {
        const { password } = changes, rest = __rest(changes, ["password"]);
        const [resp] = await this.userModel.update(rest, { where: { id_user: userId } });
        if (resp === 1) {
            return await this.findById(userId);
        }
        return { user: null };
    }
    async findByUsername(username) {
        const user = await this.userModel.findOne({ where: { username } });
        if (!user) {
            return new common_1.NotFoundException('user not found');
        }
        return user.get({ plain: true });
    }
    async changeCode(idUser) {
        const newCode = this.generateCode();
        await this.userModel.update({ code: newCode }, { where: { id_user: idUser } });
        return { newCode };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [Object, auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map