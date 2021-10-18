import { CreateProductDto } from "@lib/core/dtos/create-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { SkuDoc } from "./sku.doc";

export class CreateProductDoc extends CreateProductDto {
   
    @ApiProperty({
        description: 'Product name'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Image of product'
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Price of product'
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'CategoryId of product'
    })
    @IsString()
    categoryId: string;

    @ApiProperty({
        description: 'Quantity of product'
    })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Product description'
    })
    @IsString()
    description: string;

    @ApiProperty({
        required: false
    })
    @IsNumber()
    discountPercent?: number;

    @ApiProperty({
        type: [SkuDoc],
        required: false
    })
    skus?: SkuDoc[];
}