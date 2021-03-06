import { DiscountPercent, Product, ProductDescription, ProductName, ProductPrice, ProductProps, ProductQuantity, ProductSku, ProductStatus } from "@lib/core/domains";
import { ProductSkus } from "@lib/core/domains/product-skus";
import { Injectable } from "@nestjs/common";
import { Mapper } from "company-core";
import { ProductMongoDocumentProps } from "./product-mongo.schema";

@Injectable()
export class ProductMongoMapper extends Mapper<Product, ProductMongoDocumentProps> {

    toDomain(persistenceModel: ProductMongoDocumentProps): Product {
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
                    }, s._id).getValue();
                    sku.createdAt = s.createdAt;
                    sku.updatedAt = s.updatedAt;
                    return sku;
                })).getValue(),
                status: ProductStatus.create(persistenceModel.status).getValue(),
                discountPercent: DiscountPercent.create(persistenceModel.discountPercent).getValue()
            }

            const product = Product.create(props, persistenceModel._id).getValue();
            product.createdAt = persistenceModel.createdAt;
            product.updatedAt = persistenceModel.updatedAt;

            return product;
        } catch (error) {
            throw error;
        }
    }
    fromDomain(domainModel: Product): ProductMongoDocumentProps {
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

            return {
                _id: domainModel.id,
                name: name.value,
                image: image,
                price: price.value,
                categoryId: categoryId,
                quantity: quantity.value,
                description: description.value,
                views: views,
                skus: skus.value.map(sku => ({
                    _id: sku.id,
                    image: sku.props.image,
                    description: sku.props.description.value,
                    createdAt: sku.createdAt,
                    updatedAt: sku.updatedAt
                })),
                status: status.value,
                discountPercent: discountPercent.value,
                createdAt: domainModel.createdAt,
                updatedAt: domainModel.updatedAt
            }
        } catch (error) {
            throw error;
        }
    }

}