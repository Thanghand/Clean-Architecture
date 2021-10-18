import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsApiProductCatalogService {
  getHello(): string {
    return 'Hello World!';
  }
}
