import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

import { formatDate } from '../utils';
import { ValidationError } from 'class-validator';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let resultMessage = exception.message;
        let resultCode = 1;
        let resultParams = {};
        let errors = false;
        try {
            const { code, message, ...oth } = JSON.parse(exception.message);
            resultMessage = message;
            resultCode = code;
            resultParams = oth;
        } catch (e) { }

        if (exception.getStatus() === HttpStatus.BAD_REQUEST) {
            const validationErrors = exception.getResponse()['message'];
            errors = validationErrors;
        }

        // const message = exception.message;
        Logger.log(exception, 'Error Message');
        const errorResponse = {
            status,
            message: resultMessage,
            errors,
            code: resultCode,
            params: resultParams,
            path: request.url,
            method: request.method,
            timestamp: new Date().toLocaleDateString(),
        };

        // Print Log
        Logger.error(
            `【${formatDate(Date.now())}】${request.method} ${request.url}`,
            JSON.stringify(errorResponse),
            'HttpExceptionFilter'
        );
        // Set the response status,header and return response
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
    private formatValidationErrors(errors: ValidationError[]) {
        const formattedErrors = [];
        for (const error of errors) {
            for (const key in error.constraints) {
                formattedErrors.push({
                    property: error.property,
                    message: error.constraints[key],
                });
            }
        }
        return formattedErrors;
    }
}
