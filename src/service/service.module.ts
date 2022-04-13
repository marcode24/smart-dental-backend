import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesController } from './controllers/service.controller';
import { Service } from './entities/service.entity';
import { ServicesService } from './services/services.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ Service ])
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService]
})
export class ServiceModule {}
