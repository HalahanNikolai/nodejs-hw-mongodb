import { ContactsFromSchema } from '../db/models/contacts.js';

export const getContacts = async () => {
    return await ContactsFromSchema.find();
};

export const getContactById = async (contactId) => {
    return await ContactsFromSchema.findById(contactId);
};

export const deleteContact = async (contactId) => {
    return await ContactsFromSchema.findByIdAndDelete(contactId);
};

export function createContact(contact) {
    return ContactsFromSchema.create(contact);
};

export async function replaceContact(contactId, contact) {
    const result = await ContactsFromSchema.findByIdAndUpdate(contactId, contact, {
        new: true,
        upsert: true,
        includeResultMetadata: true
    });
    return {
        value: result.value,
        updatedExisting: result.lastErrorObject.updatedExisting
    };
    // console.log(result);
};

//**          UPDATE-CONTACTS:ID          ***//
export async function updateContact(contactId, contact) {
    return ContactsFromSchema.findByIdAndUpdate(contactId, contact, {
        new: true
    });
}
