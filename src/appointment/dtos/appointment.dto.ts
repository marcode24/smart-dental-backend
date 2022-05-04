import { PartialType } from "@nestjs/mapped-types";
import {
  IsArray,
  IsDateString,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  Validate,
  ValidateIf
} from "class-validator";
import { StatusAppointment } from "../enums/status-appointment.enum";

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

export class ChangeStatusAppointmentDto extends PartialType(CreateAppointmentDto) {

  @IsNotEmpty()
  readonly status: StatusAppointment;

}
