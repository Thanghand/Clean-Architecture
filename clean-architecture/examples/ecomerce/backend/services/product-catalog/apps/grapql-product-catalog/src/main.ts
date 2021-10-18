import { NestFactory } from '@nestjs/core';
import { GrapqlProductCatalogModule } from './grapql-product-catalog.module';

async function bootstrap() {
  const app = await NestFactory.create(GrapqlProductCatalogModule);
  await app.listen(3000);
}
bootstrap();
