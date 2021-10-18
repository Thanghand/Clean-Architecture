import { Controller, Get } from '@nestjs/common';
import { AwsApiProductCatalogService } from './aws-api-product-catalog.service';

@Controller()
export class AwsApiProductCatalogController {
  constructor(private readonly awsApiProductCatalogService: AwsApiProductCatalogService) {}

  @Get()
  getHello(): string {
    return this.awsApiProductCatalogService.getHello();
  }
}
