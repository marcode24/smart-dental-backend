import { CreateFamiliarDto } from "./familiar.dto";
export declare class CreatePatientDto {
    readonly name: string;
    readonly last_name: string;
    readonly date_birth: Date;
    readonly gender: string;
    readonly email: string;
    readonly phone_number: number;
    readonly street: string;
    readonly cp: number;
    readonly city: string;
    readonly country: string;
    readonly status: boolean;
    readonly image: string;
    id_familiar: number;
    readonly id_user: number;
    readonly familiar: CreateFamiliarDto;
}
declare const UpdatePatientDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
}
export {};
