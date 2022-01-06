import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface RequestDTO<T = any> {
  url: string;
  method: HttpMethod;
  headers: Record<string, string>;
  data: T;
}

@Injectable()
export class HttpClient {
  constructor(private axios: HttpService) {}
  async do<T = any>(request: RequestDTO) {
    const res = await firstValueFrom(this.axios.request<T>(request));
    return res.data;
  }
}
