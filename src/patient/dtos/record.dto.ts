import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength
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
