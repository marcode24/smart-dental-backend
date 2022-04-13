import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";

export class CreateServiceDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly name: string;

  @ValidateIf((_, value) => value !== null)
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  readonly status: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly odontogram: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly color: string;

}
