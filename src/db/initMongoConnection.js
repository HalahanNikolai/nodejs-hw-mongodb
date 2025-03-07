import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

const initMongoConnection = async () => {
    try {
        const uri = `mongodb+srv://${getEnvVar('MONGODB_USER')}:${getEnvVar('MONGODB_PASSWORD')}@${getEnvVar('MONGODB_URL')}/${getEnvVar('MONGODB_DB')}?retryWrites=true&w=majority`;

        await mongoose.connect(uri);

        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Mongo connection error:', error.message);
        process.exit(1);
    }
};

export default initMongoConnection;
