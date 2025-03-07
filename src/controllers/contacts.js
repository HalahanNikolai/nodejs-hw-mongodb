import { getContacts, getContactById } from '../services/contacts.js';

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
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}
