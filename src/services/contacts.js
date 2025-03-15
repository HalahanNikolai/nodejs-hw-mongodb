import { ContactsFromSchema } from '../db/models/contacts.js';

export const getContacts = async ({ page, perPage }) => {
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const [totalItems, contacts] = await Promise.all([
        ContactsFromSchema.countDocuments(),
        ContactsFromSchema.find().skip(skip).limit(perPage)
    ]);

    // const count = await ContactsFromSchema.countDocuments();
    // // console.log(count);
    // return await ContactsFromSchema.find().skip(skip).limit(perPage);

    const totalPages = Math.ceil(totalItems / perPage);

    return {
        contacts,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
    };
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
