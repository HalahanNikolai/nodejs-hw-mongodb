
import {
    getContactsPLC,
    getContactByIdPLC,
    replaceContactController,
    deleteContactController,
    createContactController,
    updateContactController
} from '../controllers/contacts.js';

import { upload } from '../middlewares/upload.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateContactSchema, contactSchema } from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

//***          GET-CONTACTS          ***//
router.get('/', ctrlWrapper(getContactsPLC));

//***          GET-CONTACTS:ID          ***//
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdPLC));

//***          DELETE-CONTACTS:ID          ***//
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

//***          CREATE-CONTACTS          ***//
router.post(
    '/',
    upload.single('photo'),
    jsonParser,
    validateBody(contactSchema),
    ctrlWrapper(createContactController));

//***          CREATE-CONTACTS:ID          ***//
router.put(
    '/:contactId',
    isValidId,
    jsonParser,
    validateBody(contactSchema),
    ctrlWrapper(replaceContactController));

//***          UPDATE-CONTACTS:ID          ***//
router.patch(
    '/:contactId',
    isValidId,
    jsonParser,
    validateBody(updateContactSchema),
    ctrlWrapper(updateContactController));

export default router;
