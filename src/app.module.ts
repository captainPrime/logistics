import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './config/env.keys';
import * as controllers from './http/controllers';
import { UserRepo } from './users/user.repo';
import { Helper } from './internal/utils';
import { TwilioService } from './internal/twilio';
import { SessionStore } from './sessions/sessions.store';

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
        entities: ['dist/**/*.entity{.ts,.js}'],
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
