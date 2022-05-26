export interface ISearchParams {
    fullname: string;
    limit: number;
    offset: number;
    all?: boolean;
    status?: string;
    date?: string;
}
export interface ISearchParamsStatistics {
    limit: number;
    offset: number;
    type: string;
    option: string;
}
