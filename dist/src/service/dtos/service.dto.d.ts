export declare class CreateServiceDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly status: boolean;
    readonly odontogram: boolean;
    readonly color: string;
}
declare const UpdateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
}
export {};
