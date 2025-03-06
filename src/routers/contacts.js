
import { getContactsPLC, getContactByIdPLC } from '../controllers/contacts.js';
import express from 'express';
const router = express.Router();
//***          GET-CONTACTS          ***//
router.get('/', getContactsPLC);

//***          GET-CONTACTS:ID          ***//
router.get('/:contactId', getContactByIdPLC);
export default router;
