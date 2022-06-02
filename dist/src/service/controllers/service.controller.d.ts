import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';
import { ServicesService } from '../services/services.service';
export declare class ServicesController {
    private readonly serviceService;
    constructor(serviceService: ServicesService);
    create(payload: CreateServiceDto): Promise<import("@nestjs/common").BadRequestException | import("../entities/service.entity").Service>;
    findAll(name?: string, limit?: number, offset?: number): Promise<{
        services: import("../entities/service.entity").Service[];
        totalActive: number;
        totalInactive: number;
    }>;
    findByFilter(odontogram: string): Promise<{
        services: import("../entities/service.entity").Service[];
    }>;
    findById(serviceId: number): Promise<import("@nestjs/common").NotFoundException | import("../entities/service.entity").Service>;
    changeStatus(serviceId: number, status: boolean): Promise<import("@nestjs/common").NotFoundException | import("../entities/service.entity").Service>;
    update(serviceId: number, payload: UpdateServiceDto): Promise<[affectedCount: number]>;
}
