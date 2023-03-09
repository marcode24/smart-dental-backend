import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

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
