import { ProductDescription } from "../product-description";
import { ProductSku, ProductSkuProps } from "../product-sku";

describe('ProductSku', () => {
    it('should create successfully when value of property are valid and non empty id', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/images/3123131313',
            description: ProductDescription.create(`
                Product details of Meiji Fresh Milk 2 L
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const id = '1234';
        const skuOrError = ProductSku.create(props, id);
        const sku = skuOrError.getValue();

        expect(skuOrError.isSuccess).toEqual(true);
        expect(sku.props).toStrictEqual(props);
    });

    it('should create successfully when value of property are valid and empty id', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/images/3123131313',
            description: ProductDescription.create(`
                Product details of Meiji Fresh Milk 2 L
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const skuOrError = ProductSku.create(props);
        const sku = skuOrError.getValue();

        expect(skuOrError.isSuccess).toEqual(true);
        expect(sku.props).toStrictEqual(props);
        expect(sku.id !== null).toEqual(true);
    });

    it('should create failed when value is missing description', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/images/3123131313',
            description: null
        }
        const skuOrError = ProductSku.create(props);

        expect(skuOrError.isFailure).toEqual(true);
    });

    it('should create failed when value is missing image', () => {
        const props: ProductSkuProps = {
            image: null,
            description: ProductDescription.create(`
                Product details of Meiji Fresh Milk 2 L
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const skuOrError = ProductSku.create(props);

        expect(skuOrError.isFailure).toEqual(true);

    });

    it('should update sku successfully', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/image/iphone12',
            description: ProductDescription.create(`
                Product details of Iphone 12
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const sku = ProductSku.create(props, '123').getValue();

        const updatedSku = ProductSku.create({
            image: 'https://company.com/products/image/note12',
            description: ProductDescription.create(`
                Product details of note 12
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }, '123').getValue();

        const resultOrError = sku.updateSku(updatedSku);

        expect(resultOrError.isSuccess).toEqual(true);
        expect(sku.props).toStrictEqual(updatedSku.props);
    });

    it('should update sku failed when the value was not matched id', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/image/iphone12',
            description: ProductDescription.create(`
                Product details of Iphone 12
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const sku = ProductSku.create(props, '123').getValue();

        const updatedSku = ProductSku.create({
            image: 'https://company.com/products/image/note12',
            description: ProductDescription.create(`
                Product details of note 12
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }, '456').getValue();

        const resultOrError = sku.updateSku(updatedSku);
        expect(resultOrError.isFailure).toEqual(true);
    });

    it('should update sku failed when the value was not matched id', () => {
        const props: ProductSkuProps = {
            image: 'https://company.com/products/image/iphone12',
            description: ProductDescription.create(`
                Product details of Iphone 12
                Freshness Promise
                Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
                If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
                About Product
                Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
                Dietary Needs
                Healthier Choice
            `).getValue()
        }
        const sku = ProductSku.create(props, '123').getValue();

        const resultOrError = sku.updateSku(null);
        expect(resultOrError.isFailure).toEqual(true);
    });
});