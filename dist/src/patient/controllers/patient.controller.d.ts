import { CreatePatientDto, UpdatePatientDto } from '../dtos/patient.dto';
import { PatientService } from '../services/patient.service';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    findAll(name: string, limit: number, offset: number): Promise<{
        patients: import("../entities/patient.entity").Patient[];
        totalActive: number;
        totalInactive: number;
    }>;
    findById(patientId: number): Promise<import("../entities/patient.entity").Patient | import("@nestjs/common").NotFoundException>;
    findByUserAndPatient(patientId: number, userId: number, isAdmin: string): Promise<import("@nestjs/common").BadRequestException | {
        patient: import("../entities/patient.entity").Patient;
    }>;
    findByUser(userId: number, name: string, limit: number, offset: number): Promise<{
        patients: import("../entities/patient.entity").Patient[];
        totalActive: number;
        totalInactive: number;
    }>;
    create(payload: CreatePatientDto): Promise<import("../entities/patient.entity").Patient>;
    changeUser(patientId: number, newUserId: number): Promise<import("@nestjs/common").NotFoundException | [affectedCount: number]>;
    changeStatus(patientId: number, status: boolean): Promise<[affectedCount: number]>;
    update(patientID: number, familiarID: number, payload: UpdatePatientDto): Promise<[[affectedCount: number], [affectedCount: number]]>;
}
