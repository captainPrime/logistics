"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const controllers = require("./http/controllers");
const consumers = require("./queue/consumers");
const redisStore = require("cache-manager-redis-store");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_keys_1 = require("./config/env.keys");
const utils_1 = require("./internal/utils");
const sessions_1 = require("./sessions/");
const twilio_1 = require("./internal/twilio");
const typeorm_1 = require("@nestjs/typeorm");
const users_1 = require("./users/");
const hoppers_1 = require("./hoppers");
const env_1 = require("./internal/env");
const transactions_1 = require("./transactions");
const axios_1 = require("@nestjs/axios");
const http_1 = require("./internal/http");
const paystack_1 = require("./internal/paystack");
const event_emitter_1 = require("@nestjs/event-emitter");
const bull_1 = require("@nestjs/bull");
const queue_1 = require("./internal/queue");
const orders_1 = require("./orders");
const order_request_repo_1 = require("./order-requests/order-request.repo");
const bankdetails_1 = require("./bankdetails");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            axios_1.HttpModule.register({
                timeout: 5000,
            }),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const { hostname, port } = new URL(configService.get(env_keys_1.Env.redis_url));
                    return { redis: { host: hostname, port: +port } };
                },
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: (0, env_1.get_schema)(),
                validationOptions: {
                    abortEarly: true,
                },
            }),
            common_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    store: redisStore,
                    url: configService.get(env_keys_1.Env.redis_url),
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.registerQueue({
                name: queue_1.QUEUE.LOCATION,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: configService.get(env_keys_1.Env.database_type),
                    url: configService.get(env_keys_1.Env.database_url),
                    entities: ['dist/**/*.model{.ts,.js}'],
                    autoLoadEntities: true,
                    ssl: true,
                    logging: false,
                    /* ssl: {
                        rejectUnauthorized: false
                      }  */
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                users_1.UserRepo,
                transactions_1.TransactionRepo,
                hoppers_1.HopperRepo,
                orders_1.OrderRepo,
                order_request_repo_1.OrderRequestRepo,
                bankdetails_1.BankdetailRepo,
            ]),
        ],
        controllers: [...Object.values(controllers)],
        providers: [
            app_service_1.AppService,
            utils_1.Helper,
            twilio_1.TwilioService,
            sessions_1.SessionStore,
            http_1.HttpClient,
            paystack_1.PaystackService,
            users_1.UserService,
            ...Object.values(consumers),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map