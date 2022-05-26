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
exports.UpdatePatientDto = exports.CreatePatientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const familiar_dto_1 = require("./familiar.dto");
class CreatePatientDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePatientDto.prototype, "date_birth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "cp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Boolean)
], CreatePatientDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "id_familiar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "id_user", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => familiar_dto_1.CreateFamiliarDto),
    __metadata("design:type", familiar_dto_1.CreateFamiliarDto)
], CreatePatientDto.prototype, "familiar", void 0);
exports.CreatePatientDto = CreatePatientDto;
class UpdatePatientDto extends (0, mapped_types_1.PartialType)(CreatePatientDto) {
}
exports.UpdatePatientDto = UpdatePatientDto;
//# sourceMappingURL=patient.dto.js.map