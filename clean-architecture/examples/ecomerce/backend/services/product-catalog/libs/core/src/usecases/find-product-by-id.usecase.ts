import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { ProductResponse } from "../dtos/product.response";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class FindProductByIdUseCase extends UseCase<string, ProductResponse> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(id: string): Promise<Result<ProductResponse>> {

        const productOrError = await this.productRepository.findById(id);
        if (productOrError.isFailure) {
            return new ApiError.NotFoundError(productOrError.error);
        }
        return Result.ok(ProductResponse.from(productOrError.getValue()));
    }
}