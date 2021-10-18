import { Module } from "@nestjs/common";
import { TypeOrmModule } from "plugin-mysql";
import { ProductMysqlMapper } from "./product-mysql.mapper";
import { productMysqlRepoProvider, ProductMySqlRepository } from "./product-mysql.repository";
import { ProductSkuMysqlMapper } from "./product-sku-mysql.mapper";
import { ProductSkuTable } from "./product-sku.table";
import { ProductTable } from "./product.table";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'mysql',
            port: 3306,
            username: 'admin',
            password: 'password',
            database: 'product-catalog-db',
            entities: [ProductTable, ProductSkuTable],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([ProductTable, ProductSkuTable]),
    ],
    providers: [
        ProductMysqlMapper,
        productMysqlRepoProvider,
        ProductSkuMysqlMapper
    ],
    exports: [
        productMysqlRepoProvider,
        ProductSkuMysqlMapper,
        ProductMysqlMapper,
        TypeOrmModule
    ]
})
export class ProductMysqlModule {
}