import Joi from "joi";

//**          CREATE-CONTACTS          ***//
export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20).email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().min(3).max(20).required()
});

//**          UPDATE-CONTACTS:ID          ***//
export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20).email(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().min(3).max(20)
});
