import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Patient } from './patient.entity';

@Table({
  timestamps: false,
  tableName: 'familiar',
  initialAutoIncrement: '1000',
})
export class Familiar extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_familiar: number;

  @HasOne(() => Patient)
  patient: Patient;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  familiar_name: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  familiar_last_name: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  familiar_gender: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  relationship: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  familiar_email: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  familiar_phone_number: number;
}
