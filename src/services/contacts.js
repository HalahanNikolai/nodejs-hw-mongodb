import { ContactsFromSchema } from '../db/models/contacts.js';

export const getContacts = async ({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
}) => {
    const skip = page > 0 ? (page - 1) * perPage : 0;
    const { contactType, isFavourite } = filter;

    const contactsQuery = ContactsFromSchema.find({ userId });
    if (filter.contactType) {
        contactsQuery.where('contactType').equals(contactType);
    }

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(isFavourite);
    }

    const [totalItems, contacts] = await Promise.all([
        ContactsFromSchema.countDocuments(contactsQuery),
        contactsQuery
            .find()
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(perPage)
    ]);

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

export const getContactById = async (contactId, userId) => {
    return await ContactsFromSchema.findOne({ _id: contactId, userId });
};

export const deleteContact = async (contactId, userId) => {
    return await ContactsFromSchema.findOneAndDelete({ _id: contactId, userId });
};

export function createContact(contact) {
    return ContactsFromSchema.create(contact);
};

export async function replaceContact(contactId, contact, userId) {
    const result = await ContactsFromSchema.findOneAndUpdate({ _id: contactId, userId }, contact, {
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
export async function updateContact(contactId, contact, userId) {
    return ContactsFromSchema.findOneAndUpdate({ _id: contactId, userId }, contact, {
        new: true
    });
}
