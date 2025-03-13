import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export function isValidId(req, _res, next) {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        // return res.status(400).json({ message: 'ID is not valid' });
        return next(new createHttpError.BadRequest('ID is not valid'));
    }
    // console.log(contactId);
    next();
}
