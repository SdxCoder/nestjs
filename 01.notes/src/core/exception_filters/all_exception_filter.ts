import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, } from "@nestjs/common";
import { CustomHttpExceptionResponse, HttpExceptionResponse } from "./models";
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";



@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status: HttpStatus;
        let error: string | string[];
        console.log(exception);

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            error = (errorResponse as any).message || (errorResponse as HttpExceptionResponse).error || exception.message;
        }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            error = "Critical server error has occured."
        }

        const method = httpAdapter.getRequestMethod(request);
        const path = httpAdapter.getRequestUrl(request);
        const errorResponse = this.getHttpErrorResponse(status, error, method, path);
        httpAdapter.reply(response, errorResponse, status);
    }

    getHttpErrorResponse(status: HttpStatus, error: string | string[], method: string, path: string): CustomHttpExceptionResponse {
        return (
            {
                statusCode: status,
                error: error,
                method: method,
                path: path,
                timestamp: new Date(),
            }
        );
    }
}