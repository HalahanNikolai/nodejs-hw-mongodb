import { ContactsFromSchema } from '../db/models/contacts.js';

export const getContacts = async () => {
    return await ContactsFromSchema.find();
};

export const getContactById = async (contactId) => {
    return await ContactsFromSchema.findById(contactId);
};
