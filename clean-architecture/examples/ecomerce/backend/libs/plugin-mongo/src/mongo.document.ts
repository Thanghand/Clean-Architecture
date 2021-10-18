import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export interface MongoDocumentProps {
    _id?: string;
    createdAt: string;
    updatedAt: string;
}

@Schema({id: false})
export class MongoDocument extends Document implements MongoDocumentProps {

    @Prop({unique: true, type: String, required: true})
    _id: string;

    @Prop({ default: `${Date.now()}` })
    createdAt: string;

    @Prop({ default: `${Date.now()}` })
    updatedAt: string;
}