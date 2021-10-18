import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class DeleteSkuUseCaseInput {
    constructor(public readonly skuId: string,
        public readonly productId: string) {
    }
}

export class DeleteSkuUseCase extends UseCase<DeleteSkuUseCaseInput, void> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: DeleteSkuUseCaseInput): Promise<Result<void>> {
        const { skuId, productId } = input;

        const existedProductOrError = await this.productRepository.findById(productId);
        if (existedProductOrError.isFailure) {
            return new ApiError.NotFoundError(existedProductOrError.error);
        }
        const product = existedProductOrError.getValue();

        const deletedOrError = product.props.skus.deleteSku(skuId);
        if(deletedOrError.isFailure) {
            return new ApiError.BadRequestError(deletedOrError.error);
        }

        const resultOrError = await this.productRepository.update(productId, product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }

        return Result.ok();
    }

}