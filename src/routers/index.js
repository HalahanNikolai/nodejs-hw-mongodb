import express from 'express';
import contactsRouters from './contacts.js';

const router = express.Router();

router.use('/contacts', contactsRouters);

export default router;
