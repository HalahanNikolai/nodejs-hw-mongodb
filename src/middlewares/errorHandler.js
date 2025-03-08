//***          Handling 500 error         ****/
import createHttpError from 'http-errors';

export function errorHandler(err, _req, res, _next) {
    if (createHttpError.isHttpError(err)) {
        return res
            .status(err.status)
            .json({ status: err.status, message: err.message });
    }
    console.error(err);
    res.status(500).json({
        message: 'Internal server error',
        error: err.message,
    });
}
