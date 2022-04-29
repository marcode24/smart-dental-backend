import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { Patient } from "./patient.entity";
import { Record } from "./record.entity";

@Table({ timestamps: false, tableName: 'tooth', initialAutoIncrement: '1' })
export class Tooth extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_tooth: number;

  @BelongsTo(() => Record)
  record: Record;

  @AllowNull(false)
  @ForeignKey(() => Record)
  @Column(DataType.INTEGER)
  id_record: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @AllowNull(false)
  @ForeignKey(() => Patient)
  @Column(DataType.INTEGER)
  id_patient: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  tooth_number: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  vestibular: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  ligual: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  mesial: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  distal: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  oclusal: boolean;

}
