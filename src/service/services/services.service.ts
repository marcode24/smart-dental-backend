import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
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

  async findAll(name: string, limit: number = 5, offset: number = 0) {
    const newLimit = limit || 5;
    const newOffset = offset || 0;
    let options: FindOptions = {
      limit: newLimit,
      offset: newOffset,
    };
    if(name) {
      const search = `%${name.toString()}%`
      options = {
        where: {
          name: { [Op.like]: search },
        },
      };
    }
    const [ services, totalActive, totalInactive ] = await Promise.all([
      this.serviceModel.findAll(options),
      this.serviceModel.count({ where: { status: true } }),
      this.serviceModel.count({ where: { status: false } }),
    ]);
    const data = { services, totalActive, totalInactive };
    return data;
  }

  async findByFilter(odontogram: boolean = false) {
    const servicesFound = await this.serviceModel.findAll({
      where: {
        odontogram,
        status: true
      }
    });
    return { services: servicesFound };
  }

  async findById(serviceId: number) {
    const serviceFound = await this.serviceModel.findByPk(serviceId);
    if(!serviceFound) {
      return new NotFoundException(`service not found with id: ${serviceId}`);
    }
    return serviceFound;
  }

  async changeStatus(serviceId: number, newValue: boolean) {
    const serviceDB = await this.serviceModel.findByPk(serviceId);
    if(!serviceDB) {
      return new NotFoundException(`service not found with id: ${serviceId}`);
    }
    serviceDB.status = Boolean(newValue);
    return await serviceDB.save();
  }

  async update(serviceId: number, changes: UpdateServiceDto) {
    return await this.serviceModel.update(changes, {
      where: {
        id_service: serviceId,
      }
    })
  }

}
