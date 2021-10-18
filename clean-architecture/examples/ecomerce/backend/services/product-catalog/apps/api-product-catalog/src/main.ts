import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiVersion = 'v1.0.0';
  app.setGlobalPrefix(apiVersion);

  const options = new DocumentBuilder()
    .setTitle('ProductCatalog service')
    .setDescription('ProductCatalog application')
    .setVersion('1.0')
    .setBasePath(apiVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
