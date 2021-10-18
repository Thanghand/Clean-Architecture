import { attribute, hashKey } from "@aws/dynamodb-data-mapper-annotations";


export class BaseTable {
    
    @hashKey()
    id: string;

    @attribute()
    createdAt: string;

    @attribute()
    updatedAt: string;
}
