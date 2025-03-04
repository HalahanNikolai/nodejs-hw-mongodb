import contactService from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contacts',
      error: error.message,
    });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await contactService.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contact',
      error: error.message,
    });
  }
};

export default {
  getContacts,
  getContactById,
};
