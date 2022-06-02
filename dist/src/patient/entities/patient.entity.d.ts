import { Model } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Familiar } from "./familiar.entity";
export declare class Patient extends Model {
    id_patient: number;
    familiar: Familiar;
    id_familiar: number;
    user: User;
    id_user: number;
    name: string;
    last_name: string;
    date_birth: Date;
    gender: string;
    email: string;
    phone_number: number;
    street: string;
    cp: number;
    city: string;
    country: string;
    status: boolean;
    image: string;
}
