import { Module } from "@nestjs/common";
import { DynamoDBModule } from "plugin-dynamo";
import { ProductDynamoMapper } from "./product-dynamo.mapper";
import { productDynamoRepoProvider } from "./product-dynamo.repository";

@Module({
    imports: [
        DynamoDBModule.forRoot({
            AWSConfig: {
                region: 'local',
                accessKeyId: 'null',
                secretAccessKey: 'null',
            },
            dynamoDBOptions: {
                endpoint: 'dynamodb:8000',
                sslEnabled: false,
                region: 'local-env',
            },
        }),
    ],
    providers: [
        ProductDynamoMapper,
        productDynamoRepoProvider
    ],
    exports: [
        ProductDynamoMapper,
        productDynamoRepoProvider,
        DynamoDBModule
    ]
})
export class ProductDynamoModule { }