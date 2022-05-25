import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { AppointmentDetail } from "src/appointment/entities/appointment-detail.entity";
import { Appointment } from "src/appointment/entities/appointment.entity";

import { Service } from "src/service/entities/service.entity";
import { Patient } from "./patient.entity";

@Table({ timestamps: true, tableName: 'record', initialAutoIncrement: '100' })
export class Record extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_record: number;

  @BelongsTo(() => Service)
  service: Service;

  @AllowNull(false)
  @ForeignKey(() => Service)
  @Column(DataType.INTEGER)
  id_service: number;

  @BelongsTo(() => Patient)
  user: Patient;

  @AllowNull(false)
  @ForeignKey(() => Patient)
  @Column(DataType.INTEGER)
  id_patient: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  service_name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  status: string;

  @Default(null)
  @Column(DataType.DATEONLY)
  payment_date: Date;

  @Default(null)
  @Column(DataType.TIME)
  payment_time: string;

  @Default(null)
  @Column(DataType.DATEONLY)
  realization_date: Date;

  @Default(null)
  @Column(DataType.TIME)
  realization_time: string;

  @Default(null)
  @Column(DataType.DATEONLY)
  cancel_date: Date;

  @Default(null)
  @Column(DataType.TIME)
  cancel_time: string;

  @BelongsToMany(() => Appointment, () => AppointmentDetail)
  appointments: Array<Appointment & { AppoinmentDetail: AppointmentDetail }> ;

}
