import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppointmentDetail } from 'src/appointment/entities/appointment-detail.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import config from 'src/config';
import { Familiar } from 'src/patient/entities/familiar.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Record } from 'src/patient/entities/record.entity';
import { Tooth } from 'src/patient/entities/tooth.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
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
          ssl: false,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'MYSQL',
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { host, dbName, password, port, username } = configService.mysql;
        const sequelize = new Sequelize({
          dialect: 'mysql',
          database: dbName,
          host,
          password,
          username,
          port,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        });
        sequelize.addModels([
          User,
          Service,
          Patient,
          Familiar,
          Record,
          Tooth,
          Appointment,
          AppointmentDetail,
        ]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
  exports: ['MYSQL', SequelizeModule],
})
export class DatabaseModule {}
