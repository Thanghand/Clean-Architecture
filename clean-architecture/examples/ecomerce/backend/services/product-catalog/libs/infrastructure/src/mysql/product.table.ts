import { Column, Entity, PrimaryGeneratedColumn } from "plugin-mysql";

@Entity()
export class ProductTable {

    @PrimaryGeneratedColumn()
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
    views:number;

    @Column()
    discountPercent: number;
}