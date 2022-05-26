export interface IStatistics {
    total_service: number;
    id_service: number;
    name: string;
    total: number;
    statistics?: IStatisticsDays[];
}
export interface IStatisticsDays {
    total: number;
    total_quantity: number;
    id_service: number;
    realization_date: Date;
}
