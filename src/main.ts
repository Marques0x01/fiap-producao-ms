import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@codegenie/serverless-express';
import { VersioningType } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('FIAP LANCHES PRODUÇÂO')
    .setVersion('1.0')
    .addTag('producao')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/api-docs',
    apiReference({
      theme: 'bluePlanet',
      cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
      spec: {
        content: document,
      },
      darkMode: true,
      showSidebar: true,
    }),
  )

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
