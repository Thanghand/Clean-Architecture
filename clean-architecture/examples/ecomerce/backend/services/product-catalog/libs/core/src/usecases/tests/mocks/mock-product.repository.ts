import { Product } from "@lib/core/domains";
import { IProductRepository } from "@lib/core/repositories";
import { Result } from "company-core";

export class MockProductRepository implements IProductRepository {

    async create(domain: Product): Promise<Result<Product>> {
        return Result.ok(domain);
    }

    findById(id: string): Promise<Result<Product>> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

    update(id: string, domain: Product): Promise<Result<Product>> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    findMany(query?: {}, projection?: {}): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    createMany(domains: Product[]): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    updateMany(domains: Product[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    findManyByIDs(ids: string[]): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    isManyExistedByIDs(ids: string[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    isExisted(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
}

export class MockFailedProductRepository implements IProductRepository {

    async create(domain: Product): Promise<Result<Product>> {
        return Result.fail('Sorry there is something wrong');
    }

    findById(id: string): Promise<Result<Product>> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

    update(id: string, domain: Product): Promise<Result<Product>> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    findMany(query?: {}, projection?: {}): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    createMany(domains: Product[]): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    updateMany(domains: Product[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    findManyByIDs(ids: string[]): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    isManyExistedByIDs(ids: string[]): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
    isExisted(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }

}