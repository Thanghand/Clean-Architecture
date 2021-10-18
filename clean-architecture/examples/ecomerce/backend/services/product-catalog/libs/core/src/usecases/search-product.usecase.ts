import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { ProductResponse } from "../dtos/product.response";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class SearchProductUseCaseInput {
}

export class SearchProductUseCase extends UseCase<SearchProductUseCaseInput, ProductResponse[]> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: SearchProductUseCaseInput): Promise<Result<ProductResponse[]>> {

        const productsOrError = await this.productRepository.findMany();
        if (productsOrError.isFailure) {
            return new ApiError.InternalServerError(productsOrError.error);
        }

        const responses = productsOrError.getValue().map(p => ProductResponse.from(p));
        return Result.ok(responses);
    }
    
}