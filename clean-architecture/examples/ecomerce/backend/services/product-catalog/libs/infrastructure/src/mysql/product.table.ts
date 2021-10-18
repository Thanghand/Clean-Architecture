import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "plugin-mysql";
import { ProductSkuTable } from "./product-sku.table";

@Entity()
export class ProductTable {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    categoryId: string;

    @Column()
    views: number;

    @Column()
    discountPercent: number;

    @Column()
    price: number;

    @Column()
    status: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @OneToMany(() => ProductSkuTable, sku => sku.product)
    skus: ProductSkuTable[];
}