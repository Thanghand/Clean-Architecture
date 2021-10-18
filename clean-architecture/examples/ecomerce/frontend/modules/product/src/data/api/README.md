

```typescript
export class ProductApi {

    private static url = `${config.api.baseUrl}/products`;

    async create(product: Product): Promise<Result<string>> {
        const response = await axios.post(url, product);
        const bodyResponse = await response.json();
        return Result.ok(bodyResponse.message);
    }
}
```