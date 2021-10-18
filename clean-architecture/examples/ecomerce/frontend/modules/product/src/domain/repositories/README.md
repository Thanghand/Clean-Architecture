

```typescript
export interface IProductRepository {
    create(product): Promise<Result<string>>;
    find(query): Promise<Result<Product[]>>;
}
```