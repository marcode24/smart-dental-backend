import { ChangeStatusAppointmentDto, CreateAppointmentDto } from '../dtos/appointment.dto';
import { StatusAppointment } from '../enums/status-appointment.enum';
import { AppointmentService } from '../services/appointment.service';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(payload: CreateAppointmentDto): Promise<boolean>;
    findByPatient(patientID: number, status: StatusAppointment): Promise<import("../entities/appointment.entity").Appointment[]>;
    findByUser(userID: number, status: StatusAppointment, date: Date, limit: number, offset: number, fullname: string): Promise<{
        appointments: import("../entities/appointment.entity").Appointment[];
        total?: undefined;
    } | {
        appointments: import("../entities/appointment.entity").Appointment[];
        total: number;
    }>;
    changeStatus(appointmentID: number, payload: ChangeStatusAppointmentDto): Promise<import("@nestjs/common").NotFoundException | import("../entities/appointment.entity").Appointment>;
}
