import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let httpStatus: number;
    let message;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const error = exception.getResponse();
      message =
        typeof error == 'string'
          ? error
          : typeof error['message'] == 'string'
          ? error['message']
          : error['message'][0];
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'We are having system level issues. Do bear with us';
    }

    httpAdapter.reply(res, { message }, httpStatus);
  }
}
