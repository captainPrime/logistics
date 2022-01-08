import * as controllers from './http/controllers';
import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Env } from './config/env.keys';
import { Helper } from './internal/utils';
import { SessionStore } from './sessions/';
import { TwilioService } from './internal/twilio';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './users/';
import { get_schema } from './internal/env';
import { TransactionRepo } from './transactions';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from './internal/http';
import { PaystackService } from './internal/paystack';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from './users';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
    }),
    ConfigModule.forRoot({
      validationSchema: get_schema(),
      validationOptions: {
        abortEarly: true,
      },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get(Env.redis_url),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get(Env.database_type),
        url: configService.get(Env.database_url),
        entities: ['dist/**/*.model{.ts,.js}'],
        autoLoadEntities: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepo, TransactionRepo]),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    Helper,
    TwilioService,
    SessionStore,
    HttpClient,
    PaystackService,
    UserService,
  ],
})
export class AppModule {}
