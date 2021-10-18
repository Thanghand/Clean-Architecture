import { BaseRepo } from 'company-core';
import { Product } from '../domains';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
export interface IProductRepository extends BaseRepo<Product> {
}