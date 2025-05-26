/* eslint-disable @typescript-eslint/no-require-imports */
if (process.env.config === 'local') {
  require('../env.js');
}

import {environment} from '@env';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import {AppModule} from './app.module';
import {
  AnyExceptionFilter,
  KnownExceptionFilter,
  ValidationExceptionFilter,
} from '@core/filters';
import {GlobalDtoPipe} from '@core/pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', true);

  const l = new Logger(bootstrap.name, {timestamp: true});

  app.setGlobalPrefix('v1');

  /**
   * Use global validation pipe
   */

  app.useGlobalPipes(new GlobalDtoPipe());

  /**
   * Use global filters
   */
  app.useGlobalFilters(
    new AnyExceptionFilter(),
    new ValidationExceptionFilter(),
    new KnownExceptionFilter()
  );

  /**
   * Enable gzip compression
   */
  app.use(compression());
  app.enableCors({
    origin: '*',
  });

  /**
   * Secure set up
   */
  app.use(helmet());
  app.use(hpp());

  const options = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'v1/api/json',
  });

  await app.listen(environment.http.port);

  l.log(
    `Server started, listening at [${await app.getUrl()}] in [${environment.mode}] environment`
  );
}

void bootstrap();
