import {
  IsBoolean,
  IsNotEmpty, IsNumber, IsPositive
} from 'class-validator';

export class CreateToothDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id_patient: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id_service: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  tooth_number: number;

  @IsNotEmpty()
  @IsBoolean()
  vestibular: boolean;

  @IsNotEmpty()
  @IsBoolean()
  ligual: boolean;

  @IsNotEmpty()
  @IsBoolean()
  mesial: boolean;

  @IsNotEmpty()
  @IsBoolean()
  distal: boolean;

  @IsNotEmpty()
  @IsBoolean()
  oclusal: boolean;

}
