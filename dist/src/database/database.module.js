"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
const appointment_entity_1 = require("../appointment/entities/appointment.entity");
const familiar_entity_1 = require("../patient/entities/familiar.entity");
const patient_entity_1 = require("../patient/entities/patient.entity");
const record_entity_1 = require("../patient/entities/record.entity");
const service_entity_1 = require("../service/entities/service.entity");
const tooth_entity_1 = require("../patient/entities/tooth.entity");
const user_entity_1 = require("../user/entities/user.entity");
const appointment_detail_entity_1 = require("../appointment/entities/appointment-detail.entity");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                inject: [config_1.default.KEY],
                useFactory: async (configService) => {
                    const { host, dbName, password, port, username } = configService.mysql;
                    return {
                        dialect: 'mysql',
                        database: dbName,
                        host,
                        password,
                        username,
                        port,
                        synchronize: false,
                        autoLoadModels: true,
                    };
                },
            }),
        ],
        providers: [
            {
                provide: 'MYSQL',
                inject: [config_1.default.KEY],
                useFactory: async (configService) => {
                    const { host, dbName, password, port, username } = configService.mysql;
                    const sequelize = new sequelize_typescript_1.Sequelize({
                        dialect: 'mysql',
                        database: dbName,
                        host,
                        password,
                        username,
                        port,
                    });
                    sequelize.addModels([
                        user_entity_1.User,
                        service_entity_1.Service,
                        patient_entity_1.Patient,
                        familiar_entity_1.Familiar,
                        record_entity_1.Record,
                        tooth_entity_1.Tooth,
                        appointment_entity_1.Appointment,
                        appointment_detail_entity_1.AppointmentDetail
                    ]);
                    await sequelize.sync();
                    return sequelize;
                },
            },
        ],
        exports: ['MYSQL', sequelize_1.SequelizeModule],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map