import { StatusAppointment } from "../enums/status-appointment.enum";
export declare class CreateAppointmentDto {
    readonly id_patient: number;
    readonly id_user: number;
    readonly id_record: Array<number>[];
    date: string;
    readonly time: string;
    readonly description: string;
    readonly status: string;
}
declare const ChangeStatusAppointmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAppointmentDto>>;
export declare class ChangeStatusAppointmentDto extends ChangeStatusAppointmentDto_base {
    readonly status: StatusAppointment;
}
export {};
