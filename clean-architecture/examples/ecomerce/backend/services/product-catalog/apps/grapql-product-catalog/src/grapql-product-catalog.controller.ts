import { Controller, Get } from '@nestjs/common';
import { GrapqlProductCatalogService } from './grapql-product-catalog.service';

@Controller()
export class GrapqlProductCatalogController {
  constructor(private readonly grapqlProductCatalogService: GrapqlProductCatalogService) {}

  @Get()
  getHello(): string {
    return this.grapqlProductCatalogService.getHello();
  }
}
