import { AddSkuUseCase, AddSkuUseCaseInput, CreateProductUseCase, CreateProductUseCaseInput, FindProductByIdUseCase, DeleteSkuUseCase, SearchProductUseCase, SearchProductUseCaseInput, UpdateProductUseCase, UpdateProductUseCaseInput, UpdateSkuUseCase, UpdateSkuUseCaseInput, DeleteSkuUseCaseInput } from "@lib/core/usecases";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { BodyResponse, ResultMapper } from "company-core";
import { CreateProductDoc, SkuDoc, UpdateProductDoc } from "../swagger-dtos";
import { ProductResponseDoc } from "../swagger-dtos/product-response.doc";

@ApiTags('Product')
@Controller('products')
export class ProductController {

    constructor(private readonly createProductUseCase: CreateProductUseCase,
        private readonly findProductByIdUseCase: FindProductByIdUseCase,
        private readonly searchProductsUseCase: SearchProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly addSkuUseCase: AddSkuUseCase,
        private readonly updateSkuUseCase: UpdateSkuUseCase,
        private readonly deleteSkuUseCase: DeleteSkuUseCase) { }

    @ApiBody({ type: CreateProductDoc })
    @Post()
    async create(@Body() dto: CreateProductDoc): Promise<BodyResponse<ProductResponseDoc>> {
        const input = new CreateProductUseCaseInput(dto);
        const result = await this.createProductUseCase.execute(input);
        return ResultMapper.toApiBodyResponse(result);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<BodyResponse<ProductResponseDoc>> {
        const result = await this.findProductByIdUseCase.execute(id);
        return ResultMapper.toApiBodyResponse(result);
    }

    @Get()
    async search(): Promise<BodyResponse<ProductResponseDoc[]>> {
        const result = await this.searchProductsUseCase.execute(new SearchProductUseCaseInput());
        return ResultMapper.toApiBodyResponse(result);
    }

    @ApiBody({ type: UpdateProductDoc })
    @Patch(':id')
    async update(@Body() dto: UpdateProductDoc, @Param('id') id: string): Promise<BodyResponse<void>> {
        const input = new UpdateProductUseCaseInput(dto, id);
        const result = await this.updateProductUseCase.execute(input);
        return ResultMapper.toApiBodyResponse(result);
    }

    @Post(':id/skus')
    async addSku(@Body() dto: SkuDoc, @Param('id') id: string): Promise<BodyResponse<void>> {

        const input = new AddSkuUseCaseInput(dto, id);
        const result = await this.addSkuUseCase.execute(input);
        return ResultMapper.toApiBodyResponse(result);
    }

    @Put(':id/skus/:skuId')
    async updateSku(@Body() dto: SkuDoc, @Param('id') id: string,
        @Param('skuId') skuId: string): Promise<BodyResponse<void>> {

        const input = new UpdateSkuUseCaseInput(dto, id, skuId);
        const result = await this.updateSkuUseCase.execute(input);
        return ResultMapper.toApiBodyResponse(result);
    }

    @Delete(':id/skus/:skuId')
    async deleteSku(@Param('id') id: string, @Param('skuId') skuId: string): Promise<BodyResponse<void>> {
        const input = new DeleteSkuUseCaseInput(id, skuId);
        const result = await this.deleteSkuUseCase.execute(input);
        return ResultMapper.toApiBodyResponse(result);
    }

}