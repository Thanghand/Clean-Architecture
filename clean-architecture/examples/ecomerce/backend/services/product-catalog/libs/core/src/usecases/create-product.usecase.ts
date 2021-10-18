import { Inject, Res } from '@nestjs/common';
import { ApiError, Result, UseCase } from 'company-core';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductResponse } from '../dtos/product.response';
import { SkuDto } from '../dtos/sku.dto';
import { DiscountPercent, Product, ProductDescription, ProductName, ProductPrice, ProductProps, ProductQuantity, ProductSku } from '../entities';
import { ProductSkus } from '../entities/product-skus';
import { IProductRepository, PRODUCT_REPOSITORY } from '../repositories';

export class CreateProductUseCaseInput {
    constructor(public readonly dto: CreateProductDto) {
    }
}

export class CreateProductUseCase extends UseCase<CreateProductUseCaseInput, ProductResponse> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: CreateProductUseCaseInput): Promise<Result<ProductResponse>> {

        const productOrError = this.validateToGetProduct(input);
        if (productOrError.isFailure) {
            return new ApiError.BadRequestError(productOrError.error);
        }
        const product = productOrError.getValue();

        // Save to db
        const resultOrError = await this.productRepository.create(product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }
        return Result.ok(ProductResponse.from(product));
    }

    private validateToGetProduct(input: CreateProductUseCaseInput): Result<Product> {
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

        const validateRequiredResult = Result.combine(validationCombine);
        if (validateRequiredResult.isFailure) {
            return new ApiError.BadRequestError(validateRequiredResult.error);
        }

        const props: ProductProps = {
            name: nameOrError.getValue(),
            price: priceOrError.getValue(),
            quantity: quantityOrError.getValue(),
            description: descriptionOrError.getValue(),
            image,
            categoryId,
        }

        if (skus) {
            const productSkusOrError = skus.map(s => this.addSku(s));
            const combineResults = Result.combine(productSkusOrError);
            if (combineResults.isFailure) {
                return Result.fail(combineResults.error);
            }
            props.skus = ProductSkus.create(productSkusOrError.map(r => r.getValue())).getValue();
        }

        if (discountPercent) {
            const discountPercentOrError = DiscountPercent.create(discountPercent);
            if (discountPercentOrError.isFailure) {
                return Result.fail(discountPercentOrError.error);
            }
            props.discountPercent = discountPercentOrError.getValue();
        }
        return Product.create(props);
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