import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomHttpExceptionResponse, HttpExceptionResponse } from "./models";
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: HttpStatus;
        let message: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            message = (errorResponse as HttpExceptionResponse).error || exception.message;
        }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Critical server error has occured."
        }

        const errorResponse = this.getHttpErrorResponse(status, message, request);
        response.status(status).json(errorResponse);
    }

    getHttpErrorResponse(status: HttpStatus, message: string, request: Request): CustomHttpExceptionResponse {
        return (
            {
                error: message,
                statusCode: status,
                path: request.url,
                method: request.method,
                timestamp: new Date(),
            }
        );
    }
}