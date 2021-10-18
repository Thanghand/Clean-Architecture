import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { SkuDto } from "../dtos/sku.dto";
import { ProductSku, ProductDescription } from "../domains";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class UpdateSkuUseCaseInput {
    constructor(public readonly dto: SkuDto,
        public readonly productId: string,
        public readonly skuId: string) {
    }
}

export class UpdateSkuUseCase extends UseCase<UpdateSkuUseCaseInput, void> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: UpdateSkuUseCaseInput): Promise<Result<void>> {

        const { dto, productId, skuId } = input;

        const existedProductOrError = await this.productRepository.findById(productId);
        if (existedProductOrError.isFailure) {
            return new ApiError.NotFoundError(existedProductOrError.error);
        }
        const product = existedProductOrError.getValue();
        const skuOrError = this.validateToGetSku(dto, skuId);
        if (skuOrError.isFailure) {
            return new ApiError.BadRequestError(skuOrError.error);
        }

        const updatedOrError = product.props.skus.updateSku(skuOrError.getValue());
        if (updatedOrError.isFailure) {
            return new ApiError.BadRequestError(updatedOrError.error);
        }

        const resultOrError = await this.productRepository.update(productId, product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }
        return Result.ok();
    }

    private validateToGetSku(dto: SkuDto, skuId: string): Result<ProductSku> {
        const descriptionOrError = ProductDescription.create(dto.description);
        if (descriptionOrError.isFailure) {
            return Result.fail(descriptionOrError.error);
        }

        const skuOrError = ProductSku.create({
            image: dto.image,
            description: descriptionOrError.getValue()
        }, skuId);
        
        if (skuOrError.isFailure) {
            return Result.fail(skuOrError.error);
        }
        return Result.ok(skuOrError.getValue());
    }
}