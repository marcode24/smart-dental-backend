import { Model } from "sequelize-typescript";
import { Patient } from "src/patient/entities/patient.entity";
import { Record } from "src/patient/entities/record.entity";
import { User } from "src/user/entities/user.entity";
import { AppointmentDetail } from "./appointment-detail.entity";
export declare class Appointment extends Model {
    id_appointment: number;
    patient: Patient;
    id_patient: number;
    user: User;
    id_user: number;
    date: Date;
    time: string;
    description: string;
    status: string;
    records: Array<Record & {
        AppoinmentDetail: AppointmentDetail;
    }>;
}
