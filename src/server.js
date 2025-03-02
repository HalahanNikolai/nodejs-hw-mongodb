import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';


dotenv.config();

const setupServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(pino());

    //* Get contacts from database...

    app.get('/', (req, res) => {
        res.json({ message: 'Hello world!' });
    });

    app.use('*', (req, res) => {
        res.status(404).json({ message: 'Not found' });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    return server;
};

export default setupServer;



