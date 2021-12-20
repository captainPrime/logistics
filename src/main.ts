import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './internal/errors';

async function bootstrap() {
  const { PORT, SERVICE_ENV, SERVICE_NAME } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.disable('x-powered-by');

  if (SERVICE_ENV != 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(SERVICE_NAME.toUpperCase())
      .setDescription('API specification')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-spec', app, document);
  }

  await app.listen(PORT);
  Logger.log(`Application running on ${await app.getUrl()}`, 'Application');
}
bootstrap();
