import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  IsNumeric,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({ timestamps: true, tableName: 'service', initialAutoIncrement: '10000' })
export class Service extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_service: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  description: string;

  @AllowNull(false)
  @IsNumeric
  @Column(DataType.DOUBLE({decimals: 2}))
  price: number;

  @AllowNull(true)
  @Default(true)
  @Column(DataType.BOOLEAN)
  status: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  odontogram: boolean;

  @AllowNull(false)
  @Column(DataType.STRING(7))
  color: string;

}