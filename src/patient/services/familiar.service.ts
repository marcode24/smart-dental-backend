import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFamiliarDto } from '../dtos/familiar.dto';
import { Familiar } from '../entities/familiar.entity';

@Injectable()
export class FamiliarService {
  constructor(
    @InjectModel(Familiar) private familiarModel: typeof Familiar
  ) {}

  create(data: CreateFamiliarDto) {
    return this.familiarModel.create({ ...data });
  }

}
