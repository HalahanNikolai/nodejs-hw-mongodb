import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getContacts, getContactById } from './services/contacts.js';

dotenv.config();

const setupServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(pino());
    app.use(express.json());

    //***          GET-CONTACTS          ***//
    app.get('/contacts', async (req, res) => {
        const contacts = await getContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts',
            data: contacts,
        });
    });

    //***          GET-CONTACTS:ID          ***//
    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            console.log('Received contactId:', contactId);
            const contact = await getContactById(contactId);
            if (contact === null) {
                return res.status(404).json({
                    status: 404,
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}`,
                data: contact,
            });
        }
        catch (error) {
            console.log(error);
        }
    });

    app.get('/', (req, res) => {
        res.json({ message: 'Hello my Friends!' });
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



