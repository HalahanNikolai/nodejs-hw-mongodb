import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const setupServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(pino());

    app.get('/contacts', getAllContacts);

    app.get('/contacts/:contactId', getContactById);

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



