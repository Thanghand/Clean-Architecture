import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { SkuDto } from "../dtos/sku.dto";
import { ProductDescription, ProductSku, ProductSkuProps } from "../domains";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class AddSkuUseCaseInput {
    constructor(public readonly dto: SkuDto,
        public readonly productId: string) {
    }
}

export class AddSkuUseCase extends UseCase<AddSkuUseCaseInput, void> {
    
    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: AddSkuUseCaseInput): Promise<Result<void>> {
        
        const { dto, productId } = input;

        const existedProductOrError = await this.productRepository.findById(productId);
        if (existedProductOrError.isFailure) {
            return new ApiError.NotFoundError(existedProductOrError.error);
        }
        const product = existedProductOrError.getValue();

        const skuOrError = this.validateToGetSku(dto);
        if (skuOrError.isFailure) {
            return new ApiError.BadRequestError(skuOrError.error);
        }
        const addedOrError = product.props.skus.addNewSku(skuOrError.getValue());
        if(addedOrError.isFailure) {
            return new ApiError.BadRequestError(addedOrError.error);
        }
        
        const resultOrError = await this.productRepository.update(productId, product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }

        return Result.ok();
    }

    private validateToGetSku(dto: SkuDto): Result<ProductSku> {
        const descriptionOrError = ProductDescription.create(dto.description);
        if (descriptionOrError.isFailure) {
            return Result.fail(descriptionOrError.error);
        }

        const skuOrError = ProductSku.create({
            image: dto.image,
            description: descriptionOrError.getValue()
        });
        if (skuOrError.isFailure) {
            return Result.fail(skuOrError.error);
        }

        return Result.ok(skuOrError.getValue());
        
    }
}