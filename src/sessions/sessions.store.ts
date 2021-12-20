import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { createHmac } from 'crypto';
import { Env } from 'src/config/env.keys';

Injectable();
export class SessionStore {
  private readonly secret: string;
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    configService: ConfigService,
  ) {
    this.secret = configService.get(Env.service_secret);
  }
  /**
   * stores resource in redis for easy retrieval
   * @param key unique identifier
   * @param payload content to be set
   * @param ttl ttl for session
   */
  async create<T = any>(key: string, payload: T, ttl = 0) {
    const token = this.get_token(key);
    const content = JSON.stringify(payload);
    await this.store(token, content, ttl);
    return token;
  }

  /**
   * updates an existing resource in redis, throws exception if resource wasn't existing
   * @param key unique identifier
   * @param payload updated content
   * @param ttl ttl for session
   */
  async update<T = any>(key: string, payload: T, ttl = 0) {
    const token = this.get_token(key);
    //make sure the token exists
    let content = await this.cache.get(token);
    if (!content) throw new KeyNotFound();

    content = JSON.stringify(payload);
    await this.store(token, content, ttl);
    return true;
  }

  /**
   * retrieves the resource mapped to the provided token
   * @param token
   * @returns
   */
  get(token: string) {
    return this.cache.get(token);
  }

  /**
   * encrypts a unique identifier
   * @param key unique identifier
   * @returns string
   */
  private get_token(key: string) {
    return createHmac('sha256', this.secret).update(key).digest('hex');
  }

  /**
   * sets a value in redis memory store
   * @param key identifier
   * @param value content to be stored
   * @param ttl ttl for resource
   */
  private async store<T = any>(key: string, value: T, ttl: number) {
    await this.cache.set(key, value, { ttl });
  }
}

export class KeyNotFound extends Error {
  constructor() {
    super('token identifier does not match any record');
  }
}
