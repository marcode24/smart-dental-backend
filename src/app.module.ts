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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_END] || '.env',
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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
