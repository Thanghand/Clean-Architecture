
# Example

```typescript

export class CreateProductUseCase extends UseCase<Product, string> {

    constructor(private readonly productRepository: IProductRepository) {}

    async protected buildUseCase(input: Product): Promise<Result<string>> {
        return await this.productRepository.create(input);
    }
}
 
export class FindProductUseCaseInput extends SearchQueryParams {
}

export class FindProductUseCase extends UseCase<FindProductUseCaseInput, Product[]> {
    constructor(private readonly productRepository: IProductRepository) {}

    async protected buildUseCase(input: FindProductUseCaseInput): Promise<Result<string>> {
        return await this.productRepository.find(input);
    }
}

```