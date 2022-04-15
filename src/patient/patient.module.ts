import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PatientController } from './controllers/patient.controller';

import { PatientService } from './services/patient.service';
import { FamiliarService } from './services/familiar.service';

import { Patient } from './entities/patient.entity';
import { Familiar } from './entities/familiar.entity';
import { User } from 'src/user/entities/user.entity';
import { Record } from './entities/record.entity';
import { RecordController } from './controllers/record.controller';
import { RecordService } from './services/record.service';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ Patient, Familiar, User, Record ]),
    ServiceModule
  ],
  providers: [
    PatientService,
    FamiliarService,
    RecordService,
  ],
  controllers: [PatientController, RecordController]
})
export class PatientModule {}
