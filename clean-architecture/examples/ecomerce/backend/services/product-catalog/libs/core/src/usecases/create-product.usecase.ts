import { Inject, Res } from '@nestjs/common';
import { ApiError, Result, UseCase } from 'company-core';
import { CreateProductDto } from '../dtos/create-product.dto';
import { SkuDto } from '../dtos/sku.dto';
import { DiscountPercent, Product, ProductDescription, ProductName, ProductPrice, ProductProps, ProductQuantity, ProductSku } from '../entities';
import { IProductRepository, PRODUCT_REPOSITORY } from '../repositories';

export class CreateProductUseCaseInput {
    constructor(public readonly dto: CreateProductDto) {
    }
}

export class CreateProductUseCase extends UseCase<CreateProductUseCaseInput, void> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: CreateProductUseCaseInput): Promise<Result<void>> {

        const propsOrError = this.validateToGetProductProps(input);
        if (propsOrError.isFailure) {
            return new ApiError.BadRequestError(propsOrError.error);
        }

        const productOrError = Product.create(propsOrError.getValue());
        if (productOrError.isFailure) {
            return new ApiError.BadRequestError(productOrError.error);
        }
        const product = productOrError.getValue();

        // Save to db
        const resultOrError = await this.productRepository.create(product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }
        return Result.ok();
    }

    private validateToGetProductProps(input: CreateProductUseCaseInput): Result<ProductProps> {
        const { dto } = input;

        const {
            name,
            image,
            price,
            categoryId,
            quantity,
            description,
            skus, // Optional
            discountPercent, // Optional
        } = dto;

        const nameOrError = ProductName.create(name);
        const priceOrError = ProductPrice.create(price);
        const quantityOrError = ProductQuantity.create(quantity);
        const descriptionOrError = ProductDescription.create(description);

        const validationCombine: Result<any>[] = [
            nameOrError,
            priceOrError,
            quantityOrError,
            descriptionOrError
        ];

        if (skus) {
            const productSkusOrError = skus.map(s => this.addSku(s));
            validationCombine.push(...productSkusOrError);
        }

        if (discountPercent) {
            const discountPercentOrError = DiscountPercent.create(discountPercent);
            validationCombine.push(discountPercentOrError);
        }

        const validateRuleResult = Result.combine(validationCombine);
        if (validateRuleResult.isFailure) {
            return new ApiError.BadRequestError(validateRuleResult.error);
        }

        return Result.ok({
            name: nameOrError.getValue(),
            price: priceOrError.getValue(),
            quantity: quantityOrError.getValue(),
            description: descriptionOrError.getValue(),
            image,
            categoryId
        });
    }

    private addSku(sku: SkuDto): Result<ProductSku> {
        const descriptionOrError = ProductDescription.create(sku.description);
        if (descriptionOrError.isFailure) {
            return Result.fail(descriptionOrError.error);
        }
        return ProductSku.create({
            image: sku.image,
            description: descriptionOrError.getValue()
        });
    }
}