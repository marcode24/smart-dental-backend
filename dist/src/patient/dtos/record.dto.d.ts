export declare class CreateRecordDto {
    id_service: number;
    id_patient: number;
    quantity: number;
}
declare const UpdateRecordDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecordDto>>;
export declare class UpdateRecordDto extends UpdateRecordDto_base {
}
export {};
