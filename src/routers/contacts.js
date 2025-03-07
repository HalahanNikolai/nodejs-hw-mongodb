
import { getContactsPLC, getContactByIdPLC } from '../controllers/contacts.js';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();

//***          GET-CONTACTS          ***//
router.get('/', ctrlWrapper(getContactsPLC));

//***          GET-CONTACTS:ID          ***//
router.get('/:contactId', ctrlWrapper(getContactByIdPLC));
export default router;
