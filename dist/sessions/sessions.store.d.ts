import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
export declare class SessionStore {
    private cache;
    private readonly secret;
    constructor(cache: Cache, configService: ConfigService);
    create<T = any>(key: string, payload: T, ttl?: number): Promise<string>;
    update<T = any>(key: string, payload: T, ttl?: number): Promise<boolean>;
    get<T = unknown>(token: string): Promise<T>;
    private get_token;
    private store;
}
export declare class KeyNotFound extends Error {
    constructor();
}
