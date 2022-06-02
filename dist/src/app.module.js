"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const environment_1 = require("../environment");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Joi = require("joi");
const config_2 = require("./config");
const auth_module_1 = require("./auth/auth.module");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user.module");
const service_module_1 = require("./service/service.module");
const patient_module_1 = require("./patient/patient.module");
const appointment_module_1 = require("./appointment/appointment.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'front-end'),
                exclude: ['/api*'],
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: environment_1.environments[process.env.NODE_ENV] || '.env',
                load: [config_2.default],
                isGlobal: true,
                validationSchema: Joi.object({
                    MYSQL_DB: Joi.string().required(),
                    MYSQL_HOST: Joi.string().required(),
                    MYSQL_PORT: Joi.number().required(),
                    MYSQL_ROOT_USERNAME: Joi.string().required(),
                    MYSQL_ROOT_PASSWORD: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                })
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            patient_module_1.PatientModule,
            user_module_1.UserModule,
            service_module_1.ServiceModule,
            appointment_module_1.AppointmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map