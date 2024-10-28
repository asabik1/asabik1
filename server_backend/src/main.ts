import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { mainConfig } from './main.config';
import * as fs from 'fs';
import path from 'path';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const config = new DocumentBuilder()
    .setTitle('Asabik API Docs')
    .setDescription('All endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const filePath = 'swagger.json';
  fs.writeFileSync(filePath, JSON.stringify(document, null, 2), 'utf-8');

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { docExpansion: 'none', filter: true },
  });

  mainConfig(app);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
