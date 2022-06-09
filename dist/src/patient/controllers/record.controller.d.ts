import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';
import { RecordService } from '../services/record.service';
export declare class RecordController {
    private readonly recordService;
    constructor(recordService: RecordService);
    create(payload: CreateRecordDto): Promise<import("../entities/record.entity").Record>;
    changeStatus(recordId: number, newStatus: string): Promise<import("../entities/record.entity").Record | import("@nestjs/common").NotFoundException | import("@nestjs/common").BadRequestException>;
    getStatistics(limit: number): Promise<import("../../common/models/statistics.model").IStatistics[]>;
    getStatisticsDate(limit: number, offset: number, type: string, option: string): Promise<import("@nestjs/common").BadRequestException | {
        records: import("../entities/record.entity").Record[];
        earnings: import("../entities/record.entity").Record[];
        total: number;
    }>;
    findByPatient(patientId: number, filter: number): Promise<import("../entities/record.entity").Record[]>;
    updateRecord(recordId: number, payload: UpdateRecordDto): Promise<import("../entities/record.entity").Record | import("@nestjs/common").NotFoundException | import("@nestjs/common").BadRequestException | 0>;
}
