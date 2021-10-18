import { CreateTableOptions, DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDBClass } from "../module/dynamodb.interfaces";
import { equals } from "@aws/dynamodb-expressions";
import { BaseRepo, Mapper, Result } from "company-core";

export abstract class DynamoRepository<DOMAIN> implements BaseRepo<DOMAIN>  {

    constructor(protected readonly model: DataMapper, protected mapper: Mapper,
        protected dynamodbClass: DynamoDBClass,
        protected tableOptions?: CreateTableOptions) {
        console.log("Table Options: ", tableOptions);
        model.ensureTableExists(dynamodbClass, tableOptions);
    }

    abstract getObjectAssign(entity: any): any;

    isManyExistedByIDs(ids: string[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

    async findMany(query?: {}, projection?: {}): Promise<Result<DOMAIN[]>> {
        try {
            const domains: DOMAIN[] = [];
            if (query) {
                for await (const entity of this.model.query(this.dynamodbClass, query)) {
                    // individual items with a hash key of "foo" will be yielded as the query is performed
                    domains.push(this.mapper.toDomain(entity));
                }
                return Result.ok(domains);
            }

            for await (const entity of this.model.scan(this.dynamodbClass)) {
                // individual items will be yielded as the scan is performed
                domains.push(this.mapper.toDomain(entity));
            }
            return Result.ok(domains);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async createMany(domains: DOMAIN[]): Promise<Result<DOMAIN[]>> {
        try {
            const entities = domains.map(d => {
                const e = this.mapper.fromDomain(d);
                return this.getObjectAssign(e);
            });
            for await (const persisted of this.model.batchPut(entities)) {
                // items will be yielded as they are successfully written
                console.log(persisted);
            }
            return Result.ok(domains);
        } catch (error) {
            return Result.fail(error);
        }
    }
    updateMany(domains: DOMAIN[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    async findManyByIDs(ids: string[]): Promise<Result<DOMAIN[]>> {

        try {
            const domains: DOMAIN[] = [];
            const toGet = ids.map(id => this.getObjectAssign({ id: id }));
            for await (const entity of this.model.batchGet(toGet)) {
                domains.push(entity);
            }
            return Result.ok(domains);
        } catch (error) {
            return Result.fail(error);
        }
    }

    isExisted(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Result<DOMAIN>> {
        try {
            try {
    
                const foundItems = await this.model.query(this.dynamodbClass, {
                    id: equals(id),
                });
    
                const entities = [];
                for await (const entity of foundItems) {
                    // individual items will be yielded as the scan is performed
                    entities.push(entity);
                }
    
                if (entities.length === 0) {
                    return Result.fail('Not found item');
                }
    
                const domain = this.mapper.toDomain(entities[0]);
                return Result.ok(domain);
            } catch (error) {
                return Result.fail(error);
            }
        } catch (error) {
            return Result.fail(error);
        }
    }

    count(): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

    async create(domain: DOMAIN): Promise<Result<DOMAIN>> {
        try {
            const entity = this.mapper.fromDomain(domain);
            const toSave = this.getObjectAssign(entity);
            const createdEntity = await this.model.put(toSave);
            const newDomain = this.mapper.toDomain(createdEntity);
            return Result.ok(newDomain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async update(id: string, domain: DOMAIN): Promise<Result<DOMAIN>> {
        try {
            const entity = this.mapper.fromDomain(domain);
            const item = await this.model.get(
                this.getObjectAssign({ id: id })
            )
            await this.model.update(Object.assign(item, entity));
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            // await this.model.findByIdAndDelete(id);
            return Result.ok(true);
        } catch (error) {
            return Result.fail(error);
        }
    }

}