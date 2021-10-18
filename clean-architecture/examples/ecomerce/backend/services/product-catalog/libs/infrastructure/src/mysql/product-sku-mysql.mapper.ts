import { ProductDescription, ProductSku } from "@lib/core/domains";
import { Mapper } from "company-core";
import { ProductSkuTable } from "./product-sku.table";

export class ProductSkuMysqlMapper extends Mapper<ProductSku, ProductSkuTable> {
    toDomain(persistenceModel: ProductSkuTable): ProductSku {
        try {
            const sku = ProductSku.create({
                image: persistenceModel.image,
                description: ProductDescription.create(persistenceModel.description).getValue()
            }, persistenceModel.id).getValue();
            sku.createdAt = persistenceModel.createdAt;
            sku.updatedAt = persistenceModel.updatedAt;
            return sku;
        } catch (error) {
            throw error;
        }
    }
    fromDomain(domainModel: ProductSku): ProductSkuTable {
        try {
            const skuTable = new ProductSkuTable();
            skuTable.id = domainModel.id;
            skuTable.image = domainModel.props.image;
            skuTable.description = domainModel.props.description.value;
            skuTable.createdAt = domainModel.createdAt;
            skuTable.updatedAt = domainModel.updatedAt;
            return skuTable;
        } catch (error) {
            throw error;
        }
    }
}