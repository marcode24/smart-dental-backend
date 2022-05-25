import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { Record } from "src/patient/entities/record.entity";
import { Appointment } from "./appointment.entity";

@Table({ timestamps: false, tableName: 'appointment_detail', initialAutoIncrement: '1' })
export class AppointmentDetail extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_appointment_detail: number;

  @ForeignKey(() => Appointment)
  @Column(DataType.INTEGER)
  id_appointment: number;

  @ForeignKey(() => Record)
  @Column(DataType.INTEGER)
  id_record: number;

}
