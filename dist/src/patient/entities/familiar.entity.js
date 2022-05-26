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
exports.Familiar = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const patient_entity_1 = require("./patient.entity");
let Familiar = class Familiar extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Familiar.prototype, "id_familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => patient_entity_1.Patient),
    __metadata("design:type", patient_entity_1.Patient)
], Familiar.prototype, "patient", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], Familiar.prototype, "familiar_name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], Familiar.prototype, "familiar_last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], Familiar.prototype, "familiar_gender", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], Familiar.prototype, "relationship", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Familiar.prototype, "familiar_email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Familiar.prototype, "familiar_phone_number", void 0);
Familiar = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: false, tableName: 'familiar', initialAutoIncrement: '1000' })
], Familiar);
exports.Familiar = Familiar;
//# sourceMappingURL=familiar.entity.js.map