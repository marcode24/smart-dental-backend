import { PartialType } from "@nestjs/mapped-types";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from "class-validator";

export class CreateRecordDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id_service: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id_patient: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsDateString()
  realization_date: Date;

}

export class UpdateRecordDto extends PartialType(CreateRecordDto) {}
