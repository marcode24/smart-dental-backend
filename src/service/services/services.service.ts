import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDto } from '../dtos/service.dto';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServicesService {

  constructor(
    @InjectModel(Service) private serviceModel: typeof Service,
  ) {}

  async create(data: CreateServiceDto) {
    const { price } = data;
    const priceRegex = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/);
    if(!price.toString().match(priceRegex)) {
      return new BadRequestException('Must provide a valid price');
    }
    const serviceCreated = await this.serviceModel.create({...data});
    return serviceCreated;
  }

}
