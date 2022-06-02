import { NotFoundException } from '@nestjs/common';
import { CreateToothDto, UpdateToothDto } from '../dtos/tooth.dto';
import { Tooth } from '../entities/tooth.entity';
import { RecordService } from './record.service';
export declare class ToothService {
    private toothModel;
    private recordService;
    constructor(toothModel: typeof Tooth, recordService: RecordService);
    create(data: CreateToothDto): Promise<Tooth>;
    findByPatient(patientId: number): Promise<Tooth[]>;
    update(toothId: number, data: UpdateToothDto): Promise<NotFoundException | Tooth>;
}
