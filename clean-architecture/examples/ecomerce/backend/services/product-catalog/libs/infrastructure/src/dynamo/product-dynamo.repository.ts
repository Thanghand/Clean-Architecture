import { Product } from "@lib/core/domains";
import { IProductRepository, PRODUCT_REPOSITORY } from "@lib/core/repositories";
import { DataMapper, DynamoRepository, DYNAMO_DB_DATA_MAPPER } from "plugin-dynamo";
import { ProductDynamoMapper } from "./product-dynamo.mapper";
import { ProductDynamoTable } from "./product-dynamo.schema";

export class ProductDynamoRepository extends DynamoRepository<Product> implements IProductRepository {

    constructor(model: DataMapper, productDynamoMapper: ProductDynamoMapper) {
        super(model, productDynamoMapper, ProductDynamoTable, {
            readCapacityUnits: 5,
            writeCapacityUnits: 5,
        });
    }

    getObjectAssign(entity: any) {
        return Object.assign(new ProductDynamoTable, entity);
    }
}

export const productDynamoRepoProvider = {
    provide: PRODUCT_REPOSITORY,
    useFactory: async (model: DataMapper, mapper: ProductDynamoMapper) => {
        return new ProductDynamoRepository(model, mapper);
    },
    inject: [DYNAMO_DB_DATA_MAPPER, ProductDynamoMapper],
};