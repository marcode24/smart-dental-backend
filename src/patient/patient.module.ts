import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceModule } from 'src/service/service.module';
import { User } from 'src/user/entities/user.entity';

import { PatientController } from './controllers/patient.controller';
import { RecordController } from './controllers/record.controller';
import { ToothController } from './controllers/tooth.controller';
import { Familiar } from './entities/familiar.entity';
import { Patient } from './entities/patient.entity';
import { Record } from './entities/record.entity';
import { Tooth } from './entities/tooth.entity';
import { FamiliarService } from './services/familiar.service';
import { PatientService } from './services/patient.service';
import { RecordService } from './services/record.service';
import { ToothService } from './services/tooth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient, Familiar, User, Record, Tooth]),
    ServiceModule,
  ],
  providers: [PatientService, FamiliarService, RecordService, ToothService],
  controllers: [PatientController, RecordController, ToothController],
})
export class PatientModule {}
