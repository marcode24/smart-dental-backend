import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_END] || '.env',
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
