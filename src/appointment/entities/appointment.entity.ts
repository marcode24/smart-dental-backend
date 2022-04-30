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
import { Patient } from "src/patient/entities/patient.entity";
import { Record } from "src/patient/entities/record.entity";
import { User } from "src/user/entities/user.entity";
import { AppointmentDetail } from "./appointment-detail.entity";

@Table({ timestamps: true, tableName: 'appointment', initialAutoIncrement: '1000' })
export class Appointment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_appointment: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @AllowNull(false)
  @ForeignKey(() => Patient)
  @Column(DataType.INTEGER)
  id_patient: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  id_user: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.STRING(1024))
  description: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  status: boolean;

  @BelongsToMany(() => Record, () => AppointmentDetail )
  records: Array<Record & { AppoinmentDetail: AppointmentDetail }>;

}
