import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(nestApp, config);
    document.paths = Object.keys(document.paths).reduce((acc, path) => {
      acc[`/api${path}`] = document.paths[path];
      return acc;
    }, {});

    SwaggerModule.setup('swagger', nestApp, document);

    await nestApp.init();

    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
