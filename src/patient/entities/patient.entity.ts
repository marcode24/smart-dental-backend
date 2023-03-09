import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsEmail,
  IsNumeric,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

import { Familiar } from './familiar.entity';

@Table({ timestamps: true, tableName: 'patient', initialAutoIncrement: '1000' })
export class Patient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_patient: number;

  @BelongsTo(() => Familiar)
  familiar: Familiar;

  @AllowNull(false)
  @ForeignKey(() => Familiar)
  @Column(DataType.INTEGER)
  id_familiar: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  id_user: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  last_name: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  date_birth: Date;

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
  @Column(DataType.STRING(5))
  cp: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  city: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  country: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  status: boolean;

  @Column(DataType.STRING(120))
  image: string;
}
