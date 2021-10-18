import { DiscountPercent } from "../discount-percent";
import { Product, ProductProps } from "../product";
import { ProductDescription } from "../product-description";
import { ProductName } from "../product-name";
import { ProductPrice } from "../product-price";
import { ProductQuantity } from "../product-quantity";
import { ProductSku } from "../product-sku";
import { ProductSkus } from "../product-skus";
import { ProductStatus } from "../product-status";

describe('Product', () => {

    describe('create', () => {

        it(`should create successfully when the value of important properties are valid and id non empty value. 
            Some optional properties should have default value after creating product`, () => {

            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
                `).getValue(),
                price: ProductPrice.create(100).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);
            const product = productOrError.getValue();

            expect(productOrError.isSuccess).toEqual(true);
            expect(product.props.views).toEqual(0);
            expect(product.props.skus.value).toEqual([]);
            expect(product.props.status).toEqual(ProductStatus.WAITING_FOR_APPROVE);
            expect(product.props.discountPercent.value).toEqual(0);
        });

        it('should create successfully when all the value of properties are valid and non null/undefined', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
                price: ProductPrice.create(100).getValue(),
                discountPercent: DiscountPercent.create(25).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
                views: 5,
                skus: ProductSkus.create(
                    [
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
                        Healthier Choice`).getValue(),
                        }).getValue()
                    ]
                ).getValue(),
                status: ProductStatus.ACTIVE
            }
            const productOrError = Product.create(props);
            const product = productOrError.getValue();

            expect(productOrError.isSuccess).toEqual(true);
            expect(product.props).toStrictEqual(props);
        });

        it('should create failed when properties are missing name', () => {
            const props: ProductProps = {
                name: null,
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
            `).getValue(),
                price: ProductPrice.create(100).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        });

        it('should create failed when properties are missing image', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
                image: null,
                description: ProductDescription.create(`
                Product details of IPHONE 6
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue(),
                price: ProductPrice.create(100).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        });

        it('should create failed when properties are missing description', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
                image: 'https://company.com/products/images/3123131313',
                description: null,
                price: ProductPrice.create(100).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        });

        it('should create failed when properties are missing price', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
                `).getValue(),
                price: null,
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        });

        it('should create failed when properties are missing categoryId', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
                `).getValue(),
                price: ProductPrice.create(100).getValue(),
                categoryId: null,
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        });

        it('should create failed when properties are missing quantity', () => {
            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
                `).getValue(),
                price: ProductPrice.create(100).getValue(),
                categoryId: 'Phone',
                quantity: null,
            }
            const productOrError = Product.create(props);

            expect(productOrError.isFailure).toEqual(true);
        })
    });

    describe('rename', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should rename successfully when the value is valid', () => {

            const value = 'IPHONE 12';
            const name = ProductName.create(value).getValue();
            const result = product.rename(name);

            expect(result.isSuccess).toEqual(true);
            expect(product.props.name.value).toEqual(value);
        });

        it('should rename failed when the value is null', () => {
            const result = product.rename(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('updatePrice', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should update price successfully when the value is valid', () => {
            const value = 80;
            const price = ProductPrice.create(value).getValue();
            const result = product.updatePrice(price);

            expect(result.isSuccess).toEqual(true);
            expect(product.props.price.value).toEqual(value);
        });

        it('should update price failed when the value is null', () => {
            const result = product.updatePrice(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('updateDiscountPercent', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should update successfully when the value is valid', () => {
            const value = 35;
            const discountPercent = DiscountPercent.create(value).getValue();

            const result = product.updateDiscountPercent(discountPercent);

            expect(result.isSuccess).toEqual(true);
            expect(product.props.discountPercent.value).toEqual(value);
        });

        it('should update failed when the value is null', () => {
            const result = product.updateDiscountPercent(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('updateQuantity', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should update successfully when the value is valid', () => {
            const value = 10;
            const quantity = ProductQuantity.create(value).getValue();
            const result = product.updateQuantity(quantity);

            expect(result.isSuccess).toEqual(true);
            expect(product.props.quantity.value).toEqual(value);
        });

        it('should update failed when the value is null', () => {
            const result = product.updateQuantity(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('increaseView', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should increase successfully', () => {

            const result = product.increaseView();

            expect(result.isSuccess).toEqual(true);
            expect(product.props.views).toEqual(1);
        });
    });


    describe('updateSkus', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should update skus successfully', () => {
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
            const skus = ProductSkus.create([sku]).getValue();

            const resultOrError = product.updateSkus(skus);

            expect(resultOrError.isSuccess).toEqual(true);
            expect(product.props.skus.value.find(s => s.id === sku.id)).toStrictEqual(sku);
        });

        it('should update failed when the value is null', () => {
            const result = product.updateSkus(null);
            expect(result.isFailure).toEqual(true);
        });
    });

    describe('updateCategoryId', () => {
        const props: ProductProps = {
            name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
            price: ProductPrice.create(100).getValue(),
            categoryId: 'Phone',
            quantity: ProductQuantity.create(10).getValue(),
        }
        let product: Product;

        beforeEach(() => {
            product = Product.create(props).getValue();
        });

        it('should update categoryId successfully', () => {
            const value = 'Food';
            const resultOrError = product.updateCategoryId(value);

            expect(resultOrError.isSuccess).toEqual(true);
            expect(product.props.categoryId).toEqual(value);
        });

        it('should update categoryId failed when the value is null', () => {
            const resultOrError = product.updateCategoryId(null);
            expect(resultOrError.isFailure).toEqual(true);
        });
    });

    describe('getDiscountPrice', () => {

        it('should get correct discount price', () => {

            const props: ProductProps = {
                name: ProductName.create('IPHONE 6').getValue(),
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
            `).getValue(),
                price: ProductPrice.create(80).getValue(),
                discountPercent: DiscountPercent.create(25).getValue(),
                categoryId: 'Phone',
                quantity: ProductQuantity.create(10).getValue(),
            }
            const productOrError = Product.create(props);
            const product = productOrError.getValue();

            const result = product.getSalePrice();
            const expectedDiscountPrice = 60;

            expect(result).toEqual(expectedDiscountPrice);
        });
    });

});