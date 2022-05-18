export interface ISearchParams {
  fullname: string;
  limit: number;
  offset: number;
  all?: boolean;
  status?: string;
  date?: string;
}