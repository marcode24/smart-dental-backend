import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from "sequelize-typescript";

import config from 'src/config';

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Familiar } from 'src/patient/entities/familiar.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Record } from 'src/patient/entities/record.entity';
import { Service } from 'src/service/entities/service.entity';
import { Tooth } from 'src/patient/entities/tooth.entity';
import { User } from 'src/user/entities/user.entity';
import { AppointmentDetail } from 'src/appointment/entities/appointment-detail.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ config.KEY ],
      useFactory: async(configService: ConfigType<typeof config>) => {
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
      inject: [ config.KEY ],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { host, dbName, password, port, username } = configService.mysql;
        const sequelize = new Sequelize({
          dialect: 'mysql',
          database: dbName,
          host,
          password,
          username,
          port,
        });
        sequelize.addModels([
          User,
          Service,
          Patient,
          Familiar,
          Record,
          Tooth,
          Appointment,
          AppointmentDetail
        ]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
  exports:['MYSQL', SequelizeModule],
})
export class DatabaseModule {}
