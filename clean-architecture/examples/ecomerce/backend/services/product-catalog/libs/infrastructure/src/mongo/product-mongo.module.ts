import { Module } from "@nestjs/common";
import { ProductMongoMapper } from "./product-mongo.mapper";
import { productDataProviders, productModelProviders } from "./product-mongo.provider";
import { productMongoRepoProvider } from "./product-mongo.repository";

@Module({
    providers: [
        ...productDataProviders,
        ...productModelProviders,
        ProductMongoMapper,
        productMongoRepoProvider
    ],
    exports: [
        productMongoRepoProvider
    ]
})
export class ProductMongoModule {
}