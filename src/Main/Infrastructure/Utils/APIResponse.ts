export interface ApiResponse<T>
{
    code: number;
    status: string;
    data?: T;
    error?: string;
}