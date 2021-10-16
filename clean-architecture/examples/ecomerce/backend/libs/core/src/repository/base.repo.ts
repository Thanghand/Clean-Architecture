import { Result } from '../functional';

export interface BaseRepo<Domain> {
    findMany(query?: {}, projection?: {}): Promise<Result<Domain[]>>;
    createMany(domains: Domain[]): Promise<Result<Domain[]>>;
    updateMany(domains: Domain[]): Promise<Result<boolean>>;
    findManyByIDs(ids: string[]): Promise<Result<Domain[]>>;
    isManyExistedByIDs(ids: string[]): Promise<Result<boolean>>;
    isExisted(id: string): Promise<Result<boolean>>;
}