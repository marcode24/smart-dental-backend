import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';

import config from './config';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front-end'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
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
    DatabaseModule,
    AuthModule,
    PatientModule,
    UserModule,
    ServiceModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
