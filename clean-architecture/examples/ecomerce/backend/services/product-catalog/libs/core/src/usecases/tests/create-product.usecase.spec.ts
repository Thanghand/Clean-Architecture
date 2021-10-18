import { CreateProductDto } from "@lib/core/dtos/create-product.dto";
import { CreateProductUseCase, CreateProductUseCaseInput } from "../create-product.usecase";
import { MockFailedProductRepository, MockProductRepository } from "./mocks/mock-product.repository";

describe('CreateProductUseCase', () => {

    it('should execute successfully', async () => {

        const dto: CreateProductDto = {
            name: 'IPHONE 12',
            image: 'https://company.com/products/images/3123131313',
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: '123',
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isSuccess).toEqual(true);
    });

    it('should execute failed when validation of name is failed', async () => {

        const dto: CreateProductDto = {
            name: 'Ip',
            image: 'https://company.com/products/images/3123131313',
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: '123',
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });

    it('should execute failed when validation of description is failed', async () => {

        const dto: CreateProductDto = {
            name: 'Iphone 12',
            image: 'https://company.com/products/images/3123131313',
            description: `Product description`,
            price: 80,
            categoryId: '123',
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });

    it('should execute failed when validation of quantity is failed', async () => {

        const dto: CreateProductDto = {
            name: 'Iphone 12',
            image: 'https://company.com/products/images/3123131313',
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: '123',
            quantity: -1
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });

    it('should execute failed when validation of categoryId is null', async () => {

        const dto: CreateProductDto = {
            name: 'Iphone 12',
            image: 'https://company.com/products/images/3123131313',
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: null,
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });

    it('should execute failed when validation of image is null', async () => {

        const dto: CreateProductDto = {
            name: 'Iphone 12',
            image: null,
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: '123',
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });

    it('should execute failed when productRepository is create failed', async () => {

        const dto: CreateProductDto = {
            name: 'IPHONE 14',
            image: 'https://company.com/products/images/3123131313',
            description: `
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice`,
            price: 80,
            categoryId: '123',
            quantity: 10
        };

        const useCaseInput = new CreateProductUseCaseInput(dto);
        const mockProductRepository = new MockFailedProductRepository();
        const createProductUseCase = new CreateProductUseCase(mockProductRepository);
        const result = await createProductUseCase.execute(useCaseInput);

        expect(result.isFailure).toEqual(true);
    });
});