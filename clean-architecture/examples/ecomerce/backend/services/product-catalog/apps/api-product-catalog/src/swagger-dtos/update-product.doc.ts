import { UpdateProductDto } from "@lib/core/dtos/update-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDoc extends UpdateProductDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discountPercent?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    categoryId?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
}