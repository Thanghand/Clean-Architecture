import { ProductResponse } from "@lib/core/dtos/product.response";
import { SkuDto } from "@lib/core/dtos/sku.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { SkuDoc } from "./sku.doc";

export class ProductResponseDoc extends ProductResponse {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsString()
    categoryId: string;

    @ApiProperty()
    @IsNumber()
    views: number;

    @ApiProperty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsNumber()
    discountPercent: number;

    @ApiProperty()
    @IsNumber()
    salePrice: number;

    @ApiProperty()
    @IsString()
    updatedAt: string;

    @ApiProperty({
        type: SkuDoc
    })
    skus: SkuDto[];
}