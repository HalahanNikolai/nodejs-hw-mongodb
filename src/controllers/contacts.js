import createHttpError from 'http-errors';

import {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  replaceContact,
  updateContact
} from '../services/contacts.js';

//***          GET-CONTACTS          ***//
export async function getContactsPLC(req, res) {
  const contacts = await getContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts',
    data: contacts,
  });
}

//***          GET-CONTACTS:ID          ***//
export async function getContactByIdPLC(req, res, next) {
  const { contactId } = req.params;
  console.log('Received contactId:', contactId);
  const contact = await getContactById(contactId);
  if (contact === null) {
    // return res.status(404).json({
    //   status: 404,
    //   message: 'Contact not found',
    // });
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

//***          DELETE-CONTACTS:ID          ***//
export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  // console.log(result);
  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(204).json({ status: 204 });
}

//***          CREATE-CONTACTS          ***//
export async function createContactController(req, res) {
  const result = await createContact(req.body);
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

  const result = await replaceContact(contactId, contact);
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
  const result = await updateContact(contactId, contact);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
}
