import { ProductDescription } from "../product-description";
import { ProductSku } from "../product-sku";
import { ProductSkus } from "../product-skus";

describe('ProductSkus', () => {
    describe('create', () => {
        it('should create successfully when the value of skus is valid', () => {
            const value: ProductSku[] = [
                ProductSku.create({
                    image: 'https://company.com/products/images/3123131313',
                    description: ProductDescription.create(`
                        Product details of IPHONE 6
                        Freshness Promise
                        Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                        If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                        About Product
                        Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                        Dietary Needs
                        Healthier Choice
                    `).getValue()
                }).getValue()
            ];

            const skusOrError = ProductSkus.create(value);
            const skus = skusOrError.getValue();

            expect(skusOrError.isSuccess).toEqual(true);
            expect(skus.value).toStrictEqual(value);
        });

        it('should create failed when the value of skus is null', () => {
            const skusOrError = ProductSkus.create(null);

            expect(skusOrError.isFailure).toEqual(true);
        });
    });

    describe('addNewSku', () => {
        let skus: ProductSkus;
        beforeEach(() => {
            const value: ProductSku[] = [
                ProductSku.create({
                    image: 'https://company.com/products/images/3123131313',
                    description: ProductDescription.create(`
                        Product details of IPHONE 6
                        Freshness Promise
                        Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                        If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                        About Product
                        Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                        Dietary Needs
                        Healthier Choice
                    `).getValue()
                }).getValue()
            ];
            skus = ProductSkus.create(value).getValue();
        });

        it('should add new sku successfully', () => {
            const sku = ProductSku.create({
                image: 'https://company.com/products/images/3123131313',
                description: ProductDescription.create(`
                    Product details of IPHONE 6
                    Freshness Promise
                    Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                    If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                    About Product
                    Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                    Dietary Needs
                    Healthier Choice
                `).getValue()
            }).getValue();

            const result = skus.addNewSku(sku);

            expect(result.isSuccess).toEqual(true);
            expect(skus.value.find(s => s.id === sku.id)).toStrictEqual(sku);

        });

        it('should add sku failed when new sku is existed', () => {
            const sku = ProductSku.create({
                image: 'https://company.com/products/images/3123131313',
                description: ProductDescription.create(`
                    Product details of IPHONE 6
                    Freshness Promise
                    Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                    If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                    About Product
                    Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                    Dietary Needs
                    Healthier Choice`).getValue()
            }, '123').getValue();

            skus.addNewSku(sku);
            const result = skus.addNewSku(sku);
            console.log('Skus length', skus.value.length);
            expect(result.isFailure).toEqual(true);
        });

        it('should add sku failed when new sku is null', () => {
            const result = skus.addNewSku(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('updateSku', () => {
        let skus: ProductSkus;
        beforeEach(() => {
            const value: ProductSku[] = [
                ProductSku.create({
                    image: 'https://company.com/products/images/3123131313',
                    description: ProductDescription.create(`
                        Product details of IPHONE 6
                        Freshness Promise
                        Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                        If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                        About Product
                        Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                        Dietary Needs
                        Healthier Choice
                    `).getValue()
                }, '123').getValue()
            ];
            skus = ProductSkus.create(value).getValue();
        });

        it('should update successfully when sku is valid and exist', () => {
            const sku = ProductSku.create({
                image: 'https://company.com/products/images/3123131313',
                description: ProductDescription.create(`
                    Product details of IPHONE 12
                    Freshness Promise
                    Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                    If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                    About Product
                    Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                    Dietary Needs
                    Healthier Choice
                    Red
                `).getValue()
            }, '123').getValue();

            const result = skus.updateSku(sku);

            expect(result.isSuccess).toEqual(true);
            expect(skus.value.find(s => s.id === sku.id)).toStrictEqual(sku);
        });

        it('should update failed when sku is not existed', () => {
            const sku = ProductSku.create({
                image: 'https://company.com/products/images/3123131313',
                description: ProductDescription.create(`
                    Product details of IPHONE 12
                    Freshness Promise
                    Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                    If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                    About Product
                    Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                    Dietary Needs
                    Healthier Choice
                    Red
                `).getValue()
            }, '456').getValue();

            const result = skus.updateSku(sku);
            expect(result.isFailure).toEqual(true);
        });

        it('should update failed when sku is null', () => {
            const result = skus.updateSku(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('deleteSku', () => {
        let skus: ProductSkus;

        beforeEach(() => {
            const value: ProductSku[] = [
                ProductSku.create({
                    image: 'https://company.com/products/images/3123131313',
                    description: ProductDescription.create(`
                        Product details of IPHONE 6
                        Freshness Promise
                        Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                        If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                        About Product
                        Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                        Dietary Needs
                        Healthier Choice
                    `).getValue()
                }, '123').getValue()
            ];
            skus = ProductSkus.create(value).getValue();
        });

        it('should delete successfully when sku is existed', () => {
            const result = skus.deleteSku('123');

            expect(result.isSuccess).toEqual(true);
            expect(skus.value.length).toEqual(0);
        });

        it('should delete failed when sku is not existed', () => {
            const result = skus.deleteSku('456');
            expect(result.isFailure).toEqual(true);
        });
    });
});