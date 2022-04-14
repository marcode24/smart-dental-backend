import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PatientController } from './controllers/patient.controller';

import { PatientService } from './services/patient.service';
import { FamiliarService } from './services/familiar.service';

import { Patient } from './entities/patient.entity';
import { Familiar } from './entities/familiar.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ Patient, Familiar, User ]),
  ],
  providers: [
    PatientService,
    FamiliarService,
  ],
  controllers: [PatientController]
})
export class PatientModule {}
