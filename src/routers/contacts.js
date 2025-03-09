
import {
    getContactsPLC,
    getContactByIdPLC,
    replaceContactController,
    deleteContactController,
    createContactController,
    updateContactController
} from '../controllers/contacts.js';

import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

//***          GET-CONTACTS          ***//
router.get('/', ctrlWrapper(getContactsPLC));

//***          GET-CONTACTS:ID          ***//
router.get('/:contactId', ctrlWrapper(getContactByIdPLC));

//***          DELETE-CONTACTS:ID          ***//
router.delete('/:contactId', ctrlWrapper(deleteContactController));

//***          CREATE-CONTACTS          ***//
router.post('/', jsonParser, ctrlWrapper(createContactController));

//***          CREATE-CONTACTS:ID          ***//
router.put('/:contactId', jsonParser, ctrlWrapper(replaceContactController));

//***          UPDATE-CONTACTS:ID          ***//
router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController));

export default router;
