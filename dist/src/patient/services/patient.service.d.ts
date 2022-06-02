import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from '../dtos/patient.dto';
import { Patient } from '../entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { FamiliarService } from './familiar.service';
import { ISearchParams } from '../../common/models/search.model';
export declare class PatientService {
    private patientModel;
    private userModel;
    private familiarService;
    private optionsQuery;
    constructor(patientModel: typeof Patient, userModel: typeof User, familiarService: FamiliarService);
    create(data: CreatePatientDto): Promise<Patient>;
    findById(patientId: number): Promise<Patient | NotFoundException>;
    findbyUserAndPatient(userID: number, patientID: number, isAdmin?: boolean): Promise<BadRequestException | {
        patient: Patient;
    }>;
    findAll(params: ISearchParams): Promise<{
        patients: Patient[];
        totalActive: number;
        totalInactive: number;
    }>;
    findByUser(userId: number, params: ISearchParams): Promise<{
        patients: Patient[];
        totalActive: number;
        totalInactive: number;
    }>;
    private findPatients;
    private getOptionsQuery;
    changeUser(patientId: number, newUserId: number): Promise<NotFoundException | [affectedCount: number]>;
    update(patientID: number, familiarID: number, changes: UpdatePatientDto): Promise<[[affectedCount: number], [affectedCount: number]]>;
    setStatusPatient(patientId: number, value: boolean): Promise<[affectedCount: number]>;
}
