import { Test, TestingModule } from '@nestjs/testing';
import { AwsApiProductCatalogController } from './aws-api-product-catalog.controller';
import { AwsApiProductCatalogService } from './aws-api-product-catalog.service';

describe('AwsApiProductCatalogController', () => {
  let awsApiProductCatalogController: AwsApiProductCatalogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AwsApiProductCatalogController],
      providers: [AwsApiProductCatalogService],
    }).compile();

    awsApiProductCatalogController = app.get<AwsApiProductCatalogController>(AwsApiProductCatalogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(awsApiProductCatalogController.getHello()).toBe('Hello World!');
    });
  });
});
