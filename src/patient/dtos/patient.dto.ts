import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
  ValidateNested
} from "class-validator";
import { CreateFamiliarDto } from "./familiar.dto";

export class CreatePatientDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  readonly last_name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date_birth: Date;

  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  readonly email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phone_number: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly street: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cp: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly city: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly country: string;

  @ValidateIf((_, value) => value !== null)
  readonly status: boolean;

  @ValidateIf((_, value) => value !== null)
  readonly image: string;

  @ValidateIf((_, value) => value !== null)
  id_familiar: number;

  @IsNotEmpty()
  @IsNumber()
  readonly id_user: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateFamiliarDto)
  readonly familiar: CreateFamiliarDto;

}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
