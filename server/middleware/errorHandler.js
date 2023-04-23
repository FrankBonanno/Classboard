const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    let customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something Went Wrong... Try Again...',
    };

    console.log(err);

    // Mongo Duplicate Value Error
    if (err.code && err.code === 11000) {
        customErr.msg = `Dupe Value Entered For ${Object.keys(err.keyValue)}`;
        customErr.statusCode = 400;
    }

    // Validation Errors
    if (err.name === 'ValidationError') {
        customErr.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(' & ');
        customErr.statusCode = 400;
    }

    // Cast Errors
    if (err.name === 'CastError') {
        customErr.msg = `Nothing found with ${Object.values(err.value)}`;
        customErr.statusCode = 404;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customErr.statusCode).json({ msg: customErr.msg });
};

module.exports = errorHandlerMiddleware;
