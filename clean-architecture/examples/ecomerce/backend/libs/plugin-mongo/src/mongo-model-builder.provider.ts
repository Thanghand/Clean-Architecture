import { Connection, Schema } from "mongoose";


export class MongoModelBuilderProvider {
    
    private _provide: string;
    private _schemaName: string;
    private _schema: Schema;
    private _dbToken: string;

    provide(value: string): this {
        this._provide = value;
        return this;
    }

    schemaName(value: string): this {
        this._schemaName = value;
        return this;
    }

    schema(value: Schema): this {
        this._schema = value;
        return this;
    }

    dbToken(value: string): this {
        this._dbToken = value ?? 'default';
        return this;
    }

    build() {
        return {
            provide: this._provide,
            useFactory: (connection: Connection) => connection.model(this._schemaName, this._schema),
            inject: [this._dbToken ?? 'default']
        }
    }
}