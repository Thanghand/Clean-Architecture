import { MongoBuilderProvider, MongoModelBuilderProvider } from "plugin-mongo"
import { productMongoConfig } from "./product-mongo.config"
import { ProductDocument, ProductMongoSchema, ProductMongoSchemaName } from "./product-mongo.schema"


export const productDataProviders = [
    new MongoBuilderProvider()
        .token(productMongoConfig.token)
        .uri(productMongoConfig.uri)
        .config({
            dbToken: productMongoConfig.token,
            uri: productMongoConfig.uri,
        })
        .build()
]

export const productModelProviders = [
    new MongoModelBuilderProvider()
        .dbToken(productMongoConfig.token)
        .provide(ProductDocument.name)
        .schemaName(ProductMongoSchemaName)
        .schema(ProductMongoSchema)
        .build(),
]