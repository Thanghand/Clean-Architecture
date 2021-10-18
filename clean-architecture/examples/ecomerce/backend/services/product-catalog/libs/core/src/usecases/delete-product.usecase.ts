import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class DeleteProductUseCase extends UseCase<string, void> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async  buildUseCase(id: string): Promise<Result<void>> {

        const existedProductOrError = await this.productRepository.findById(id);
        if (existedProductOrError.isFailure) {
            return new ApiError.NotFoundError(existedProductOrError.error);
        }

        const resultOrError = await this.productRepository.delete(id);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }

        return Result.ok();
    }
}