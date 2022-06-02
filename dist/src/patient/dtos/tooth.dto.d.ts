export declare class CreateToothDto {
    id_patient: number;
    id_service: number;
    tooth_number: number;
    vestibular: boolean;
    ligual: boolean;
    mesial: boolean;
    distal: boolean;
    oclusal: boolean;
}
declare const UpdateToothDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateToothDto>>;
export declare class UpdateToothDto extends UpdateToothDto_base {
}
export {};
