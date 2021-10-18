
```typescript
export class ProductWebRepository implements IProductRepository {

    constructor(private readonly productApi: IProductApi, 
        private readonly localeStorage) {
    }

    async create(product: Product): Promise<Result<string>> {
         try {
            const products = await this.productApi.create(product);
            return Result.ok('Add product successfully');
        } catch (error) {
            this.localeStorage.setItem('product', product);
            return Result.fail(error);
        }
    }
}
```

```typescript
export class ProductMobileRepository implements IProductRepository {

    constructor(private readonly productApi: IProductApi, 
        private readonly productStorage: IProductStorage,
        private readonly connectionService: IConnectionService) {
    }

    async find(query): Promise<Result<Product[]>> {
        try {
            if (connection.isOffLine()) {
                const products = await this.productStorage.find(query);
                return Result.ok(products);
            }
            const products =await this.productApi.find(query);
            return Result.ok(products);
        } catch (error) {
            // Catch exception 
            ...
            connectionService.onOffline();
            // Depend on your business
            return await this.productStorage.find(query);
        }
    }

    async create(product: Product): Promise<Result<string>> {
         try {
            if (connection.isOffLine()) {
                const products = await this.productStorage.create(product);
                return Result.ok('Product saved to storage in offline');
            }

            const products =await this.productApi.create(product);
            return Result.ok('Add product successfully');
        } catch (error) {
            return Result.fail(error);
        }
    }
}
```