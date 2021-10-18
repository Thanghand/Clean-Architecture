import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "plugin-mysql";
import { ProductTable } from "./product.table";

@Entity()
export class ProductSkuTable {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @ManyToOne(() => ProductTable, product => product.skus)
    product: ProductTable;
}