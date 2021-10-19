import { hashKey, rangeKey } from "@aws/dynamodb-data-mapper-annotations";
import { attribute, table } from "plugin-dynamo";

export class ProductSkuTable {
    PK: string;
    image: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

@table('products')
export class ProductDynamoTable {

    @hashKey()
    PK: string;

    @rangeKey()
    categoryId: string;

    @attribute()
    name: string;

    @attribute()
    image: string;

    @attribute()
    price: number;

    @attribute()
    quantity: number;

    @attribute()
    description: string;

    @attribute()
    views: number;

    @attribute()
    skus: ProductSkuTable[];

    @attribute()
    status: string;

    @attribute()
    discountPercent: number;

    @attribute()
    updatedAt: string;

    @attribute()
    createdAt: string;
}