const CustomAPIError = require('../errors/CustomAPIError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

    res.status(500).json({ msg: 'Something Went Wrong Internally :(' });
};

module.exports = errorHandler;
