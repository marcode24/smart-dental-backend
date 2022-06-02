import { Model } from "sequelize-typescript";
import { Patient } from "./patient.entity";
export declare class Familiar extends Model {
    id_familiar: number;
    patient: Patient;
    familiar_name: string;
    familiar_last_name: string;
    familiar_gender: string;
    relationship: string;
    familiar_email: string;
    familiar_phone_number: number;
}
