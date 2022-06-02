import { CreateFamiliarDto, UpdateFamiliarDto } from '../dtos/familiar.dto';
import { Familiar } from '../entities/familiar.entity';
export declare class FamiliarService {
    private familiarModel;
    constructor(familiarModel: typeof Familiar);
    create(data: CreateFamiliarDto): Promise<Familiar>;
    update(familiarID: number, changes: UpdateFamiliarDto): Promise<[affectedCount: number]>;
}
