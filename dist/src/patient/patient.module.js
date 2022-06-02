"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const patient_controller_1 = require("./controllers/patient.controller");
const record_controller_1 = require("./controllers/record.controller");
const familiar_service_1 = require("./services/familiar.service");
const patient_service_1 = require("./services/patient.service");
const record_service_1 = require("./services/record.service");
const familiar_entity_1 = require("./entities/familiar.entity");
const patient_entity_1 = require("./entities/patient.entity");
const record_entity_1 = require("./entities/record.entity");
const tooth_entity_1 = require("./entities/tooth.entity");
const user_entity_1 = require("../user/entities/user.entity");
const service_module_1 = require("../service/service.module");
const tooth_controller_1 = require("./controllers/tooth.controller");
const tooth_service_1 = require("./services/tooth.service");
let PatientModule = class PatientModule {
};
PatientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                patient_entity_1.Patient,
                familiar_entity_1.Familiar,
                user_entity_1.User,
                record_entity_1.Record,
                tooth_entity_1.Tooth
            ]),
            service_module_1.ServiceModule
        ],
        providers: [
            patient_service_1.PatientService,
            familiar_service_1.FamiliarService,
            record_service_1.RecordService,
            tooth_service_1.ToothService,
        ],
        controllers: [patient_controller_1.PatientController, record_controller_1.RecordController, tooth_controller_1.ToothController]
    })
], PatientModule);
exports.PatientModule = PatientModule;
//# sourceMappingURL=patient.module.js.map