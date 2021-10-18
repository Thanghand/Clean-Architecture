import { NestFactory } from '@nestjs/core';
import { AwsApiProductCatalogModule } from './aws-api-product-catalog.module';

async function bootstrap() {
  const app = await NestFactory.create(AwsApiProductCatalogModule);
  await app.listen(3000);
}
bootstrap();
