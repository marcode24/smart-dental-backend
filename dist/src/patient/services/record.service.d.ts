import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ServicesService } from 'src/service/services/services.service';
import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';
import { Record } from '../entities/record.entity';
import { IStatistics } from 'src/common/models/statistics.model';
import { ISearchParamsStatistics } from 'src/common/models/search.model';
export declare class RecordService {
    private recordModel;
    private servicesService;
    constructor(recordModel: typeof Record, servicesService: ServicesService);
    create(data: CreateRecordDto): Promise<Record>;
    changeStatus(recordId: number, newStatus: string): Promise<BadRequestException | NotFoundException | Record>;
    findByPatient(patientId: number, filter: number): Promise<Record[]>;
    update(idRecord: number, data: UpdateRecordDto): Promise<BadRequestException | NotFoundException | 0 | Record>;
    statistics(limit?: number): Promise<IStatistics[]>;
    private statisticsByDays;
    statisticsByDate(optionsParams: ISearchParamsStatistics): Promise<BadRequestException | {
        records: Record[];
        earnings: Record[];
        total: number;
    }>;
}
