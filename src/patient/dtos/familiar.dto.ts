import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFamiliarDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  readonly familiar_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  readonly familiar_last_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  readonly familiar_gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  readonly relationship: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly familiar_email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly familiar_phone_number: number;
}

export class UpdateFamiliarDto extends PartialType(CreateFamiliarDto) {}
