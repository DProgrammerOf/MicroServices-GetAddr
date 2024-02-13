export default {
    MONGO_USER: process.env.MONGODB_USERNAME || 'user_addr',
    MONGO_PWD: process.env.MONGODB_PASSWORD || '12345',
    MONGO_URL: process.env.MONGODB_URL || 'mongodb://user_addr:12345@localhost:27017/addresses',
};