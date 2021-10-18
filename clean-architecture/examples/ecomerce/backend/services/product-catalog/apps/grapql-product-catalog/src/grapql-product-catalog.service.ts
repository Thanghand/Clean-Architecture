import { Injectable } from '@nestjs/common';

@Injectable()
export class GrapqlProductCatalogService {
  getHello(): string {
    return 'Hello World!';
  }
}
