import { DiscountPercent, Product, ProductDescription, ProductName, ProductPrice, ProductProps, ProductQuantity, ProductSku, ProductStatus } from "@lib/core/domains";
import { ProductSkus } from "@lib/core/domains/product-skus";
import { Mapper } from "company-core";
import { ProductSkuTable } from "./product-sku.table";
import { ProductTable } from "./product.table";


export class ProductMysqlMapper extends Mapper<Product, ProductTable> {

    toDomain(persistenceModel: ProductTable): Product {
        try {
            const props: ProductProps = {
                name: ProductName.create(persistenceModel.name).getValue(),
                image: persistenceModel.image,
                price: ProductPrice.create(persistenceModel.price).getValue(),
                categoryId: persistenceModel.categoryId,
                quantity: ProductQuantity.create(persistenceModel.quantity).getValue(),
                description: ProductDescription.create(persistenceModel.description).getValue(),
                views: persistenceModel.views,
                skus: ProductSkus.create(persistenceModel.skus.map(s => {
                    const sku = ProductSku.create({
                        image: s.image,
                        description: ProductDescription.create(s.description).getValue()
                    }, s.id).getValue();
                    sku.createdAt = s.createdAt;
                    sku.updatedAt = s.updatedAt;
                    return sku;
                })).getValue(),
                status: ProductStatus.create(persistenceModel.status).getValue(),
                discountPercent: DiscountPercent.create(persistenceModel.discountPercent).getValue()
            }

            const product = Product.create(props, persistenceModel.id).getValue();
            product.createdAt = persistenceModel.createdAt;
            product.updatedAt = persistenceModel.updatedAt;

            return product;
        } catch (error) {
            throw error;
        }
    }
    fromDomain(domainModel: Product): ProductTable {

        try {
            const {
                name,
                image,
                price,
                categoryId,
                quantity,
                description,
                views,
                skus,
                status,
                discountPercent
            } = domainModel.props;

            const productTable = new ProductTable();
            productTable.id = domainModel.id;
            productTable.name = name.value;
            productTable.image = image;
            productTable.price = price.value;
            productTable.categoryId = categoryId;
            productTable.quantity = quantity.value;
            productTable.description = description.value;
            productTable.views = views;
            productTable.status = status.value;
            productTable.discountPercent = discountPercent.value;
            productTable.createdAt = domainModel.createdAt;
            productTable.updatedAt = domainModel.updatedAt;
            
            productTable.skus = skus.value.map(sku => {
                const skuTable = new ProductSkuTable();
                skuTable.id = sku.id;
                skuTable.image = sku.props.image;
                skuTable.description = sku.props.description.value;
                skuTable.createdAt = sku.createdAt;
                skuTable.updatedAt = sku.updatedAt;
                // skuTable.product = productTable;
                return skuTable;
            });
            return productTable;
        } catch (error) {
            throw error;
        }
    }
}