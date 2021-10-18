import { AddSkuUseCase } from './add-sku.usecase';
import { CreateProductUseCase } from './create-product.usecase';
import { DeleteProductUseCase } from './delete-product.usecase';
import { DeleteSkuUseCase } from './delete-sku.usecase';
import { FindProductByIdUseCase } from './find-product-by-id.usecase';
import { SearchProductUseCase } from './search-product.usecase';
import { UpdateProductUseCase } from './update-product.usecase';
import { UpdateSkuUseCase } from './update-sku.usecase';

export * from './create-product.usecase';
export * from './find-product-by-id.usecase';
export * from './search-product.usecase';
export * from './update-product.usecase';
export * from './delete-product.usecase';
export * from './add-sku.usecase';
export * from './delete-sku.usecase';
export * from './update-sku.usecase';

export const useCases = [
    CreateProductUseCase,
    FindProductByIdUseCase,
    SearchProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    AddSkuUseCase,
    DeleteSkuUseCase,
    UpdateSkuUseCase
]