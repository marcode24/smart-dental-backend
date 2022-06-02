import { Model } from "sequelize-typescript";
export declare class Service extends Model {
    id_service: number;
    name: string;
    description: string;
    price: number;
    status: boolean;
    odontogram: boolean;
    color: string;
}
