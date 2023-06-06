import {
  AllowNull,
  Column,
  IsEmail,
  IsNumeric,
  Model,
  Table,
  Default,
  Unique,
  PrimaryKey,
  DataType,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Patient } from 'src/patient/entities/patient.entity';

@Table({ timestamps: true, tableName: 'user', initialAutoIncrement: '1000' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_user: number;

  @HasMany(() => Patient)
  patient: Patient[];

  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  last_name: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  birth_date: Date;

  @AllowNull(false)
  @Column(DataType.STRING(10))
  gender: string;

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING(120))
  email: string;

  @IsNumeric
  @AllowNull(false)
  @Column(DataType.BIGINT)
  phone_number: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  street: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  number: number;

  @AllowNull(false)
  @Column(DataType.STRING(5))
  cp: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  city: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  country: string;

  @AllowNull(false)
  @Default('dentist')
  @Column(DataType.STRING(10))
  role: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING(24))
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  password: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  status: boolean;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  image: string;

  @Column(DataType.STRING(10))
  code: string;
}
