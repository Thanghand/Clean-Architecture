import * as mongoose from 'mongoose';
import { MongoConfig } from './mongo-config';

export class MongoBuilderProvider {

    private _dbToken: string;
    private _options: MongoConfig;
    private _uri: string;

    uri(value: string): this {
        this._uri = value;
        return this;
    }

    token(value: string): this {
        this._dbToken = value;
        return this;
    }

    config(value: MongoConfig): this {
        this._options = {
            ...value,
            useNewUrlParser: value.useNewUrlParser ?? true,
            useCreateIndex: value.useCreateIndex ?? true,
            useFindAndModify: value.useFindAndModify ?? false
        };
        return this;
    }

    build(): any {
        console.log('MongoDB Uri: ', this._uri);
        return {
            provide: this._dbToken ?? 'default',
            useFactory: async (): Promise<mongoose.Connection> => {
                mongoose.set('debug', this._options.isDebug);
                return await mongoose.createConnection(this._uri,
                    {
                        ...this._options
                    });
            }
        }
    }
}