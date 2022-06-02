import { Model } from "sequelize-typescript";
import { Patient } from "./patient.entity";
import { Record } from "./record.entity";
export declare class Tooth extends Model {
    id_tooth: number;
    record: Record;
    id_record: number;
    patient: Patient;
    id_patient: number;
    tooth_number: number;
    vestibular: boolean;
    ligual: boolean;
    mesial: boolean;
    distal: boolean;
    oclusal: boolean;
}
