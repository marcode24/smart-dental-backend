import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
import { Service } from '../entities/service.entity';
export declare class ServicesService {
    private serviceModel;
    constructor(serviceModel: typeof Service);
    create(data: CreateServiceDto): Promise<BadRequestException | Service>;
    findAll(name: string, limit?: number, offset?: number): Promise<{
        services: Service[];
        totalActive: number;
        totalInactive: number;
    }>;
    findByFilter(odontogram?: boolean): Promise<{
        services: Service[];
    }>;
    findById(serviceId: number): Promise<NotFoundException | Service>;
    changeStatus(serviceId: number, newValue: boolean): Promise<NotFoundException | Service>;
    update(serviceId: number, changes: UpdateServiceDto): Promise<[affectedCount: number]>;
}
