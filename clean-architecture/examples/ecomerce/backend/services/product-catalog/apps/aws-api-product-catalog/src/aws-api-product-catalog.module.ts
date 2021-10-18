import { Module } from '@nestjs/common';
import { AwsApiProductCatalogController } from './aws-api-product-catalog.controller';
import { AwsApiProductCatalogService } from './aws-api-product-catalog.service';

@Module({
  imports: [],
  controllers: [AwsApiProductCatalogController],
  providers: [AwsApiProductCatalogService],
})
export class AwsApiProductCatalogModule {}
