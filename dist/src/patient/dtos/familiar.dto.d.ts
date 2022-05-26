export declare class CreateFamiliarDto {
    readonly familiar_name: string;
    readonly familiar_last_name: string;
    readonly familiar_gender: string;
    readonly relationship: string;
    readonly familiar_email: string;
    readonly familiar_phone_number: number;
}
declare const UpdateFamiliarDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFamiliarDto>>;
export declare class UpdateFamiliarDto extends UpdateFamiliarDto_base {
}
export {};
