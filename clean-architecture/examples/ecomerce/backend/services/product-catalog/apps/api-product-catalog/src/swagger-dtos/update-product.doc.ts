import { UpdateProductDto } from "@lib/core/dtos/update-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateProductDoc extends UpdateProductDto {

    @ApiProperty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsNumber()
    price?: number;

    @ApiProperty()
    @IsNumber()
    discountPercent?: number;

    @ApiProperty()
    @IsString()
    categoryId?: string;

    @ApiProperty()
    @IsNumber()
    quantity?: number;

    @ApiProperty()
    @IsString()
    description?: string;
}