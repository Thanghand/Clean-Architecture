import { Product } from "@lib/core/domains";
import { IProductRepository, PRODUCT_REPOSITORY } from "@lib/core/repositories";
import { MongoRepository } from "plugin-mongo";
import { Model } from "mongoose";
import { ProductMongoMapper } from "./product-mongo.mapper";
import { ProductDocument } from "./product-mongo.schema";
import { Inject } from "@nestjs/common";

export class ProductMongoRepository extends MongoRepository<ProductDocument, Product> implements IProductRepository {

    constructor(@Inject(ProductDocument.name) model: Model<ProductDocument>, 
        private productMapper: ProductMongoMapper) {
        super(model, productMapper);
    }
}

export const productMongoRepoProvider = {
    provide: PRODUCT_REPOSITORY,
    useFactory: async (model: Model<ProductDocument>, mapper: ProductMongoMapper) => {
        return new ProductMongoRepository(model, mapper);
    },
    inject: [ProductDocument.name, ProductMongoMapper],
};