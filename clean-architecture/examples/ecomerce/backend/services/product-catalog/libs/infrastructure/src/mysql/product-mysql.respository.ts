import { Product } from "@lib/core/domains";
import { IProductRepository } from "@lib/core/repositories";
import { MySqlRepository, Repository } from "plugin-mysql";
import { ProductMysqlMapper } from "./product-mysql.mapper";
import { ProductTable } from "./product.table";

export class ProductMySqlRepository extends MySqlRepository<ProductTable, Product> implements IProductRepository {

    constructor(private readonly productMapper: ProductMysqlMapper,
        private readonly usersRepository: Repository<ProductTable>) {
        super(productMapper, usersRepository);
    }
}