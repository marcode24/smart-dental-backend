import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  ValidateIf
} from "class-validator";

export class CreateAppointmentDto {

  @IsNotEmpty()
  @IsNumber()
  readonly id_patient: number;

  @IsNotEmpty()
  @IsNumber()
  readonly id_user: number;

  @IsArray()
  readonly id_record: Array<number>[];

  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @ValidateIf((_, value) => value !== null)
  readonly description: string;

  readonly status: string;
}