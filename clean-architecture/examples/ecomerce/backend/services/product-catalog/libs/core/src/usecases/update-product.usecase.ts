import { Inject } from "@nestjs/common";
import { ApiError, Result, UseCase } from "company-core";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { DiscountPercent, Product, ProductDescription, ProductName, ProductPrice, ProductQuantity } from "../entities";
import { PRODUCT_REPOSITORY, IProductRepository } from "../repositories";

export class UpdateProductUseCaseInput {
    constructor(public readonly dto: UpdateProductDto, public readonly id) {}
}

export class UpdateProductUseCase extends UseCase<UpdateProductUseCaseInput, void> {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
        super();
    }

    protected async buildUseCase(input: UpdateProductUseCaseInput): Promise<Result<void>> {

        const { dto, id } = input;

        const existedProductOrError = await this.productRepository.findById(id);
        if (existedProductOrError.isFailure) {
            return new ApiError.NotFoundError(existedProductOrError.error);
        }
        const product = existedProductOrError.getValue();
        this.validateToUpdateProduct(dto, product);

        const resultOrError = await this.productRepository.update(id, product);
        if (resultOrError.isFailure) {
            return new ApiError.BadRequestError(resultOrError.error);
        }

        return Result.ok();
    }

    private validateToUpdateProduct(dto: UpdateProductDto, product: Product): Result<void> {

        const {
            name,
            description,
            discountPercent,
            categoryId,
            quantity,
            price
        } = dto;

        const resultCombine: Result<void>[] = [];

        if (name) {
            const nameOrError = ProductName.create(name);
            if (nameOrError.isFailure) {
                return Result.fail(nameOrError.error);
            }
            resultCombine.push(product.rename(nameOrError.getValue()));
        }

        if (description) {
            const descriptionOrError = ProductDescription.create(description);
            if (descriptionOrError.isFailure) {
                return Result.fail(descriptionOrError.error);
            }
            resultCombine.push(product.rename(descriptionOrError.getValue()));
        }

        if (discountPercent) {
            const discountPercentOrError = DiscountPercent.create(discountPercent);
            if (discountPercentOrError.isFailure) {
                return Result.fail(discountPercentOrError.error);
            }
            resultCombine.push(product.updateDiscountPercent(discountPercentOrError.getValue()));
        }

        if (categoryId) {
            resultCombine.push(product.updateCategoryId(categoryId));
        }

        if (quantity) {
            const quantityOrError = ProductQuantity.create(quantity);
            if (quantityOrError.isFailure) {
                return Result.fail(quantityOrError.error);
            }
            resultCombine.push(product.updateQuantity(quantityOrError.getValue()))
        }

        if (price) {
            const priceOrError = ProductPrice.create(price);
            if (priceOrError.isFailure) {
                return Result.fail(priceOrError.error);
            }
            resultCombine.push(product.updatePrice(priceOrError.getValue()));
        }

        return Result.combine(resultCombine);
    }

}