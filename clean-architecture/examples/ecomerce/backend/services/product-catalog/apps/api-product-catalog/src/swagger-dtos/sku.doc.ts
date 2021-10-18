import { SkuDto } from "@lib/core/dtos/sku.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SkuDoc implements SkuDto {

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsString()
    description: string;
}