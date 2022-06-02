import { Sequelize } from 'sequelize-typescript';
export declare class AppService {
    private sequelize;
    constructor(sequelize: Sequelize);
    getHello(): string;
}
