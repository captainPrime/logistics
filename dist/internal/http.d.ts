import { HttpService } from '@nestjs/axios';
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export interface RequestDTO<T = any> {
    url: string;
    method: HttpMethod;
    headers: Record<string, string>;
    data: T;
}
export declare class HttpClient {
    private axios;
    constructor(axios: HttpService);
    do<T = any>(request: RequestDTO): Promise<T>;
}
