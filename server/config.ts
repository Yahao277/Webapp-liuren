import { config } from "dotenv";

config();

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb+srv://mega:mega@tests-lkaci.mongodb.net/tests?retryWrites=true&w=majority' ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}