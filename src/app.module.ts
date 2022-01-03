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

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TypeOrmModule.forFeature([UserRepo]),
  ],
  controllers: [...Object.values(controllers)],
  providers: [Helper, TwilioService, SessionStore],
})
export class AppModule {}
