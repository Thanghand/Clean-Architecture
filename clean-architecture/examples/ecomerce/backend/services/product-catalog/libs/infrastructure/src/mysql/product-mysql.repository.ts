import { Product } from "@lib/core/domains";
import { IProductRepository, PRODUCT_REPOSITORY } from "@lib/core/repositories";
import { Result } from "company-core";
import { InjectRepository, MySqlRepository, Repository, TypeOrmModule } from "plugin-mysql";
import { ProductMysqlMapper } from "./product-mysql.mapper";
import { ProductSkuMysqlMapper } from "./product-sku-mysql.mapper";
import { ProductSkuTable } from "./product-sku.table";
import { ProductTable } from "./product.table";

export class ProductMySqlRepository extends MySqlRepository<ProductTable, Product> implements IProductRepository {

    constructor(private readonly productMapper: ProductMysqlMapper,
        private readonly productSkuMapper: ProductSkuMysqlMapper,
        @InjectRepository(ProductTable) private readonly productRepository: Repository<ProductTable>,
        @InjectRepository(ProductSkuTable) private readonly productSkuRepository: Repository<ProductSkuTable>) {
        super(productMapper, productRepository);
    }

    async create(domain: Product): Promise<Result<Product>> {
        try {
            const skus = domain.props.skus.value;
            const productSkus = skus.map(s => this.productSkuMapper.fromDomain(s));
            const insertingSkuPromises = productSkus.map(s => this.productSkuRepository.save(s));
            await Promise.all(insertingSkuPromises);

            const entity = this.productMapper.fromDomain(domain);
            await this.productRepository.save(entity);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async findById(id: string): Promise<Result<Product>> {
        try {
            const productTable = await this.productRepository.findOne({
                relations: ['skus']
            });

            const domain = this.productMapper.toDomain(productTable);
            return Result.ok(domain);
        } catch (error) {
            return Result.fail(error);
        }
    }

    async findMany(): Promise<Result<Product[]>> {
        try {
            const productTables = await this.productRepository.find({
                relations: ['skus']
            });
            const domains = productTables.map(p => this.productMapper.toDomain(p));
            return Result.ok(domains);
        } catch (error) {
            return Result.fail(error);
        }
    }
}

export const productMysqlRepoProvider = {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductMySqlRepository,
};