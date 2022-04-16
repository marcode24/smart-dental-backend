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
} from "sequelize-typescript"

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

  @AllowNull(true)
  @Default(null)
  @Column(DataType.DATE)
  completed_date: Date;

  @Default(null)
  @Column(DataType.DATE)
  payment_date: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  realization_date: Date;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.DATE)
  cancel_date: Date;

}
