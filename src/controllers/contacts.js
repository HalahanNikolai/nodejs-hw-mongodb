import createHttpError from 'http-errors';

import {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  replaceContact,
  updateContact
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

//***          GET-CONTACTS          ***//
export async function getContactsPLC(req, res) {

  // console.log(req.user);

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  // console.log({ sortBy, sortOrder });
  // console.log({ page, perPage });
  const response = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: response,
  });
}

//***          GET-CONTACTS:ID          ***//
export async function getContactByIdPLC(req, res, next) {
  const { contactId } = req.params;
  // console.log('Received contactId:', contactId);
  const contact = await getContactById(contactId, req.user.id);
  if (contact === null) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Contact fetched successfully ${contactId}`,
    data: contact,
  });
}

//***          DELETE-CONTACTS:ID          ***//
export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const result = await deleteContact(contactId, req.user.id);
  // console.log(result);
  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(204).json({ status: 204 });
}

//***          CREATE-CONTACTS          ***//
export async function createContactController(req, res) {
  const contact = {
    ...req.body,
    userId: req.user.id
  };

  const result = await createContact(contact);
  // console.log(result);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact',
    data: result,
  });
  // res.end();
}

//***          UPDATE-CONTACTS:ID  (PUT)        ***//
export async function replaceContactController(req, res) {
  const { contactId } = req.params;
  const contact = req.body;

  const result = await replaceContact(
    contactId,
    contact,
    req.user.id
  );
  if (result.updatedExisting === true) {

    return res.status(200).json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result.value
    });
  }
  res.status(201).json({
    status: 201,
    message: `Successfully created contact with id ${contactId}`,
    data: result.value,
  });
};

//***          UPDATE-CONTACTS:ID (PATCH)         ***//
export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const contact = req.body;
  const result = await updateContact(contactId, contact, req.user.id);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
}
