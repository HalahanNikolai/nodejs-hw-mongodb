//***          Handling 500 error         ****/
export function errorHandler(err, _req, res, _next) {
    console.error(err);
    res.status(500).json({
        message: 'Internal server error',
        error: err.message,
    });
}
