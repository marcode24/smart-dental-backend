import { NotFoundException } from '@nestjs/common';
import { ChangeStatusAppointmentDto, CreateAppointmentDto } from '../dtos/appointment.dto';
import { AppointmentDetail } from '../entities/appointment-detail.entity';
import { Appointment } from '../entities/appointment.entity';
import { StatusAppointment } from '../enums/status-appointment.enum';
import { ISearchParams } from 'src/common/models/search.model';
export declare class AppointmentService {
    private appointmentModel;
    private appointmentDetailModel;
    constructor(appointmentModel: typeof Appointment, appointmentDetailModel: typeof AppointmentDetail);
    create(data: CreateAppointmentDto): Promise<boolean>;
    findByPatient(patientId: number, status: StatusAppointment): Promise<Appointment[]>;
    findByUser(id_user: number, status: StatusAppointment, optionsParams: ISearchParams): Promise<{
        appointments: Appointment[];
        total?: undefined;
    } | {
        appointments: Appointment[];
        total: number;
    }>;
    changeStatus(id_appointment: number, data: ChangeStatusAppointmentDto): Promise<Appointment | NotFoundException>;
}
