import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from "sequelize-typescript";

import config from 'src/config';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ config.KEY ],
      useFactory: async(configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, username } = configService.mysql;
        return {
          dialect: 'mysql',
          database: dbName,
          host: 'localhost', // fix it ** not found localhost env
          password,
          port,
          username,
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
        const { dbName, host, password, port, username } = configService.mysql;
        const sequelize = new Sequelize({
          dialect: 'mysql',
          host: 'localhost', //fix it ** not found localhost env
          port,
          username,
          password,
          database: dbName
        });
        sequelize.addModels([User])
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
  exports:['MYSQL', SequelizeModule],
})
export class DatabaseModule {}
