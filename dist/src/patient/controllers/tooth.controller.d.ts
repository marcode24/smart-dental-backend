import { CreateToothDto, UpdateToothDto } from '../dtos/tooth.dto';
import { ToothService } from '../services/tooth.service';
export declare class ToothController {
    private readonly toothService;
    constructor(toothService: ToothService);
    create(payload: CreateToothDto): Promise<import("../entities/tooth.entity").Tooth>;
    findByPatient(patientId: number): Promise<import("../entities/tooth.entity").Tooth[]>;
    update(toothId: number, payload: UpdateToothDto): Promise<import("@nestjs/common").NotFoundException | import("../entities/tooth.entity").Tooth>;
}
