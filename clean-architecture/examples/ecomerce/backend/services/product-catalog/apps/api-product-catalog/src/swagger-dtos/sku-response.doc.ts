import { SkuDto } from "@lib/core/dtos/sku.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SkuResponseDoc implements SkuDto {

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    id: string;
    
    @ApiProperty()
    @IsString()
    createdAt: string;

    @ApiProperty()
    @IsString()
    updatedAt: string;
}