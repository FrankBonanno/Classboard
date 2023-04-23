const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./CustomAPIError');

class UnauthError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.stausCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthError;
