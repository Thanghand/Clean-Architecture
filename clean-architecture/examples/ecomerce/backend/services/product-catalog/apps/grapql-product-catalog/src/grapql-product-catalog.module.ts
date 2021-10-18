import { Module } from '@nestjs/common';
import { GrapqlProductCatalogController } from './grapql-product-catalog.controller';
import { GrapqlProductCatalogService } from './grapql-product-catalog.service';

@Module({
  imports: [],
  controllers: [GrapqlProductCatalogController],
  providers: [GrapqlProductCatalogService],
})
export class GrapqlProductCatalogModule {}
