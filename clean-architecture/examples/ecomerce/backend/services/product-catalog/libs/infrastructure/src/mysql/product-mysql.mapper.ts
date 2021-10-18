import { Product } from "@lib/core/domains";
import { Mapper } from "company-core";
import { ProductTable } from "./product.table";


export class ProductMysqlMapper extends Mapper<Product, ProductTable> {

    toDomain(persistenceModel: ProductTable): Product {
        throw new Error("Method not implemented.");
    }
    fromDomain(domainModel: Product): ProductTable {
        throw new Error("Method not implemented.");
    }
}