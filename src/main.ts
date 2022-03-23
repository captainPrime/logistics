import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './internal/errors';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

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
