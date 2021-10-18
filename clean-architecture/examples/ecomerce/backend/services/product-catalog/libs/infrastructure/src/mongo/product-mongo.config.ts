export const productMongoConfig = {
    token: process.env.MONGO_TOKEN ?? 'product-db-token',
    uri: process.env.MONGO_URI ?? 'mongodb://mongodb:27017/product-catalog-db',
}