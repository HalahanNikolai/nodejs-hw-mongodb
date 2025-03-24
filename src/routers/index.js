import express from 'express';
import authRouters from './auth.js';
import contactsRouters from './contacts.js';

const router = express.Router();
router.use('/auth', authRouters);
router.use('/contacts', contactsRouters);

export default router;
