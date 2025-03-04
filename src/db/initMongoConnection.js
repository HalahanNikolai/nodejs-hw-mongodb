import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initMongoConnection = async () => {
    try {
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
        // const uri = `mongodb+srv://kolyahome22:<pass*****>100@cluster0.6payh.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0`;

        await mongoose.connect(uri);

        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Mongo connection error:', error.message);
        process.exit(1);
    }
};

export default initMongoConnection;
