import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

import { formatDate } from '../utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let resultMessage = exception.message;
        let resultCode = 1;
        let resultParams = {};
        try {
            const { code, message, ...oth } = JSON.parse(exception.message);
            resultMessage = message;
            resultCode = code;
            resultParams = oth;
        } catch (e) { }
        // const message = exception.message;
        Logger.log(exception, 'Error Message');
        const errorResponse = {
            status,
            message: resultMessage,
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
}
