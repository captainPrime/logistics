import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export class UnauthorizedRequest extends UnauthorizedException {
  constructor(message?: string) {
    super(message ?? 'We could not find a session for your request');
  }
}

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
      Logger.error(exception, 'SYSTEM ERROR');
      console.log(exception);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'We are having system level issues. Do bear with us';
    }

    httpAdapter.reply(res, { message }, httpStatus);
  }
}
