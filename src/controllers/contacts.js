import createHttpError from 'http-errors';
import { getContacts, getContactById, deleteContact } from '../services/contacts.js';

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
  res.status(200).json({
    status: 200,
    message: `Successfully deleted contact with id ${contactId}`,
    data: result,
  });
}
