import { Test, TestingModule } from '@nestjs/testing';
import { GrapqlProductCatalogController } from './grapql-product-catalog.controller';
import { GrapqlProductCatalogService } from './grapql-product-catalog.service';

describe('GrapqlProductCatalogController', () => {
  let grapqlProductCatalogController: GrapqlProductCatalogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GrapqlProductCatalogController],
      providers: [GrapqlProductCatalogService],
    }).compile();

    grapqlProductCatalogController = app.get<GrapqlProductCatalogController>(GrapqlProductCatalogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grapqlProductCatalogController.getHello()).toBe('Hello World!');
    });
  });
});
