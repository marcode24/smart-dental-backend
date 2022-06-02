import { Model } from 'sequelize-typescript';
import { Patient } from 'src/patient/entities/patient.entity';
export declare class User extends Model {
    id_user: number;
    patient: Patient[];
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
    role: string;
    username: string;
    password: string;
    status: boolean;
    image: string;
    code: string;
}
