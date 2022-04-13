import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsDateString
} from "class-validator";

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
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
  @MinLength(4)
  @MaxLength(50)
  readonly city: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly country: string;

  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(4)
  readonly role: string;

  @IsNotEmpty()
  @MaxLength(24)
  @MinLength(5)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;

  readonly status: boolean;
  readonly image: string;
  readonly code: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
