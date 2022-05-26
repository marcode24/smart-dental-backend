import { Model } from "sequelize-typescript";
export declare class AppointmentDetail extends Model {
    id_appointment_detail: number;
    id_appointment: number;
    id_record: number;
}
