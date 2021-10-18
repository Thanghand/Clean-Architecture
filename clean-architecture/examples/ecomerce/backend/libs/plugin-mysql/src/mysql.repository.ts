import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepo, Entity, Mapper, Result } from "company-core";
import { BaseEntity, Repository } from 'typeorm';

export class MySqlRepository<EntityTable extends BaseEntity, Domain extends Entity> implements BaseRepo<Domain> {

    constructor(protected readonly mapper: Mapper,
        private entityRepo: Repository<EntityTable>) {
    }

    async findById(id: string): Promise<Result<Domain>> {
        try {
            const entity = await this.entityRepo.findOne(id);
            const domain = this.mapper.toDomain(entity);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    count(): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

    async create(domain: Domain): Promise<Result<Domain>> {
        try {
            const entity = this.mapper.fromDomain(domain);
            await this.entityRepo.save(entity);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async update(id: string, domain: Domain): Promise<Result<Domain>> {
        try {
            const entity = this.mapper.fromDomain(domain);
            const foundEntity = await this.entityRepo.findOne(id);
            await foundEntity.save({
                ...entity
            });
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }
    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.entityRepo.delete(id);
        } catch (error) {
            return Result.fail(error);
        }
    }
    async findMany(query?: {}, projection?: {}): Promise<Result<Domain[]>> {
        try {
            const entities = await this.entityRepo.find(query);
            const domains = entities.map(e => this.mapper.toDomain(e));
            return Result.ok(domains);
        } catch (error) {
            return Result.fail(error);
        }
    }
    createMany(domains: Domain[]): Promise<Result<Domain[]>> {
        throw new Error("Method not implemented.");
    }
    updateMany(domains: Domain[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    findManyByIDs(ids: string[]): Promise<Result<Domain[]>> {
        throw new Error("Method not implemented.");
    }
    isManyExistedByIDs(ids: string[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    isExisted(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

}

