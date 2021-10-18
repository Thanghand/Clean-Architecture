import { BaseRepo } from 'company-core';
import { Product } from '../entities';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
export interface IProductRepository extends BaseRepo<Product> {
}