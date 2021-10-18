import { ProductDescription } from "../product-description";

describe('ProductDescription', () => {
    it('should create successfully when value is valid', () => {
        const value = `Product details of Meiji Fresh Milk 2 L
            Freshness Promise
            Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
            If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
            About Product
            Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
            Dietary Needs
            Healthier Choice`;

        const descriptionOrError = ProductDescription.create(value);
        const description = descriptionOrError.getValue();

        expect(descriptionOrError.isSuccess).toEqual(true);
        expect(description.value).toEqual(value);
    });

    it('should create failed when length of value is smaller than minimum rule', () => {
        const value = 'Product description';
        const descriptionOrError = ProductDescription.create(value);

        expect(descriptionOrError.isFailure).toEqual(true);

    });

    it('should create failed when length of value is bigger than maximum rule', () => {
        let value = `Product details of Meiji Fresh Milk 2 L
            Freshness Promise
            Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
            If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
            About Product
            Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
            Dietary Needs
            Healthier Choice`;

        value = value.concat(value)
                     .concat(value)
                     .concat(value)
                     .concat(value);
        
        const descriptionOrError = ProductDescription.create(value);
        expect(descriptionOrError.isFailure).toEqual(true);
    });

    it('should create failed when value is null', () => {
        const value = null;
        const descriptionOrError = ProductDescription.create(value);

        expect(descriptionOrError.isFailure).toEqual(true);
    });

    it('should create failed when value has some script tag', () => {
        const value = `
            <h1>Product details of Meiji Fresh Milk 2 L Freshness Promise</h1>
            Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
            If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
            About Product
            Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
            Dietary Needs
            Healthier Choice
            <script>
                console.log('Hacking some data);
            </script>
        `;
        
        const descriptionOrError = ProductDescription.create(value);
        expect(descriptionOrError.isFailure).toEqual(true);
    });
});