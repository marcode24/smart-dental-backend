import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateFamiliarDto, UpdateFamiliarDto } from '../dtos/familiar.dto';
import { Familiar } from '../entities/familiar.entity';

@Injectable()
export class FamiliarService {
  constructor(@InjectModel(Familiar) private familiarModel: typeof Familiar) {}

  create(data: CreateFamiliarDto) {
    return this.familiarModel.create({ ...data });
  }

  update(familiarID: number, changes: UpdateFamiliarDto) {
    return this.familiarModel.update(changes, {
      where: { id_familiar: familiarID },
    });
  }
}
