"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const errors_1 = require("./internal/errors");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const { PORT, SERVICE_ENV, SERVICE_NAME } = process.env;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.setGlobalPrefix('/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new errors_1.AllExceptionsFilter(httpAdapter));
    app.disable('x-powered-by');
    if (SERVICE_ENV != 'production') {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle(SERVICE_NAME.toUpperCase())
            .setDescription('API specification')
            .setVersion('1.0')
            .addBearerAuth({
            description: `Please enter token in following format: Bearer <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header'
        }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api-spec', app, document);
    }
    await app.listen(PORT);
    common_1.Logger.log(`Application running on ${await app.getUrl()}`, 'Application');
}
bootstrap();
//# sourceMappingURL=main.js.map