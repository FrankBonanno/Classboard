const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./CustomAPIError');

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.stausCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
