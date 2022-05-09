import { ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class UnauthorizedRequest extends UnauthorizedException {
    constructor(message?: string);
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: unknown, host: ArgumentsHost): void;
}
