export declare class CreateUserDto {
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
    readonly role: string;
    readonly username: string;
    readonly password: string;
    readonly status: boolean;
    readonly image: string;
    code: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
