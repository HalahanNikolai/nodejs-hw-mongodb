
import { getContactsPLC, getContactByIdPLC, deleteContactController } from '../controllers/contacts.js';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();

//***          GET-CONTACTS          ***//
router.get('/', ctrlWrapper(getContactsPLC));

//***          GET-CONTACTS:ID          ***//
router.get('/:contactId', ctrlWrapper(getContactByIdPLC));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
