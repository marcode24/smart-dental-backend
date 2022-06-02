import { Model } from "sequelize-typescript";
import { AppointmentDetail } from "src/appointment/entities/appointment-detail.entity";
import { Appointment } from "src/appointment/entities/appointment.entity";
import { Service } from "src/service/entities/service.entity";
import { Patient } from "./patient.entity";
export declare class Record extends Model {
    id_record: number;
    service: Service;
    id_service: number;
    user: Patient;
    id_patient: number;
    service_name: string;
    quantity: number;
    price: number;
    status: string;
    payment_date: Date;
    payment_time: string;
    realization_date: Date;
    realization_time: string;
    cancel_date: Date;
    cancel_time: string;
    appointments: Array<Appointment & {
        AppoinmentDetail: AppointmentDetail;
    }>;
}
