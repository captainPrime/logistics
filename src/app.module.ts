import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './config/env.keys';
import * as controllers from './http/controllers';
import { UserService } from './http/controllers/users/user.service';
import { UserRepo } from './users/user.repo';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  providers: [UserService],
})
export class AppModule {}
