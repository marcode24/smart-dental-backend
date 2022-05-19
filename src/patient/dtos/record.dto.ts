import { PartialType } from "@nestjs/mapped-types";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateIf,
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

}

export class UpdateRecordDto extends PartialType(CreateRecordDto) {}
