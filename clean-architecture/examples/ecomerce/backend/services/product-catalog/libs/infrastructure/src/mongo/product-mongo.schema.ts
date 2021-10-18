import { SchemaFactory, Prop, Schema, MongoDocumentProps, MongoDocument} from "plugin-mongo";

export class ProductSkuSubDocument {
    _id: string;
    image: string;
    description: string;
    updateAt: string;
    createdAt: string;
}

export interface ProductMongoDocumentProps extends MongoDocumentProps{
    name: string;
    image: string;
    price: number;
    categoryId: string;
    quantity: number;
    description: string;
    views: number;
    skus: ProductSkuSubDocument[];
    status: string;
    discountPercent: number;
}

@Schema()
export class ProductDocument extends MongoDocument implements ProductMongoDocumentProps {

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    price: number;

    @Prop()
    categoryId: string;

    @Prop()
    quantity: number;

    @Prop()
    description: string;

    @Prop()
    views: number;

    @Prop()
    skus: ProductSkuSubDocument[];

    @Prop()
    status: string;

    @Prop()
    discountPercent: number;


    @Prop()
    updatedAt: string;

    @Prop()
    createdAt: string;
}

export const ProductMongoSchemaName = "products"
export const ProductMongoSchema = SchemaFactory.createForClass(ProductDocument);