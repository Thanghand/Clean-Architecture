export interface BodyResponse<T>{
    message?: string;
    data?: T;
    statusCode?: number;
}