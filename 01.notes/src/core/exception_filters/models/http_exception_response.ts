
export interface HttpExceptionResponse {
    statusCode: number,
    error: string | string[]
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    path: string,
    method: string,
    timestamp: Date
}

export interface ValidationResponse {
    response: {
        message: string | string[];
    };
}