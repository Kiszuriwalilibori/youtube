/**
 * Custom API error type to replace AxiosError dependency
 */
export interface ApiError extends Error {
    message: string;
    code?: string;
    status?: number;
    response?: {
        data?: any;
        status?: number;
        statusText?: string;
    };
}

export default ApiError;
