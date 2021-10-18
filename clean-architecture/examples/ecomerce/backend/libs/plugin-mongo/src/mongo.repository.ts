import { BaseRepo, Entity, Mapper, Result, TransformUtil } from "company-core";
import { Model, Document, FilterQuery } from 'mongoose';

export abstract class MongoRepository<DOCUMENT extends Document, Domain extends Entity> implements BaseRepo<Domain>  {

    constructor(protected readonly model: Model<DOCUMENT>, protected mapper: Mapper) { }

    async isExisted(id: string): Promise<Result<boolean>> {
        try {
            const query: FilterQuery<Document> = {
                "_id": id,
            };
            const count = await this.model.find(query).countDocuments().exec();
            return Result.ok(count > 0);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async isManyExistedByIDs(ids: string[]): Promise<Result<boolean>> {
        const resultOrError = await this.findManyByIDs(ids);
        if (resultOrError.isFailure) {
            return Result.fail(resultOrError.error);
        }

        const result = resultOrError.getValue();

        if (result.length !== ids.length)
            return Result.ok(false);

        const hashmapIDs = TransformUtil.transformArrayStringToMap(ids);
        for (const item of result) {
            if (!hashmapIDs.has(item.id.toString())) {
                return Result.ok(false);
            }
        }

        return Result.ok(true);
    }

    async updateMany(domains: Domain[]): Promise<Result<boolean>> {
        const session = await this.model.startSession();
        session.startTransaction();
        try {

            const bulk = this.model.collection.initializeOrderedBulkOp();
            domains.forEach(d => {
                const entityDocument = this.mapper.fromDomain(d);
                const query = {
                    "_id": entityDocument._id
                }
                bulk.find(query)
                    .updateOne({ "$set": entityDocument });
            })
            const result = await bulk.execute();
            await session.commitTransaction();
            if (!result.ok) {
                await session.abortTransaction();
                return Result.fail('Cannot update many');
            }

            return Result.ok(true);

        } catch (error) {
            await session.abortTransaction();
            return Result.fail(error.message);
        }
        finally {
            session.endSession();
        }
    }

    async findManyByIDs(ids: string[]): Promise<Result<Domain[]>> {
        try {
            const resultOrError = await this.findMany({
                '_id': {
                    $in: ids
                }
            });
            return resultOrError;
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async createMany(domains: Domain[]): Promise<Result<Domain[]>> {
        try {
            const entities = domains.map(d => this.mapper.fromDomain(d));
            const result = await this.model.insertMany(entities);
            return Result.ok(result as any[]);
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async findMany(query?: {}, projection?: {}): Promise<Result<Domain[]>> {
        try {
            const entities = await this.model.find(query, projection).exec();
            const domains = entities.map(e => this.mapper.toDomain(e));
            return Result.ok(domains);
        }
        catch (error) {
            return Result.fail(error.message);
        }
    }

    async findById(id: string): Promise<Result<Domain>> {
        try {
            const entity = await this.model.findById({ _id: id }).exec();
            if (entity === null)
                return Result.fail(`Cannot find this item ${id}`);
            const domain = this.mapper.toDomain(entity);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async count(): Promise<Result<number>> {
        try {
            const result = await this.model.count();
            return Result.ok(result);
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async create(domain: Domain): Promise<Result<Domain>> {
        try {
            const newModel = new this.model(this.mapper.fromDomain(domain));
            const newEntity = await newModel.save();
            return Result.ok(this.mapper.toDomain(newEntity));
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async update(id: string, domain: Domain): Promise<Result<Domain>> {
        try {
            const entity = this.mapper.fromDomain(domain);
            const updatedEntity = await this.model.findByIdAndUpdate({ _id: id }, entity);
            return Result.ok(this.mapper.toDomain(updatedEntity));
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.model.deleteOne({ _id: id });
            return Result.ok(true);
        } catch (error) {
            return Result.fail(error.message);
        }
    }

    async findOne(query: {}): Promise<Result<Domain>> {
        try {
            const entity = await this.model.findOne(query).exec();
            if (entity === null)
                return Result.fail(`Cannot find this item `);
            const domain = this.mapper.toDomain(entity);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error.message);
        }
    }

}