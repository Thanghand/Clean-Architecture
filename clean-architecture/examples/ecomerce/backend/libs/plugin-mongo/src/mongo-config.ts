import { ConnectOptions } from "mongoose";

export interface MongoConfig extends ConnectOptions {
    dbToken?: string,
    uri: string,
    isDebug?: boolean
}