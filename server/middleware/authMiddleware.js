const jwt = require('jsonwebtoken');
const { UnauthError } = require('../errors');

/* AUTH MIDDLEWARE */
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthError('Invalid Authentication');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: payload.userId,
            name: payload.name,
        };
        next();
    } catch (error) {
        console.error(error); // Log the error to the console
        throw new UnauthError('Invalid Auth :(');
    }
};

module.exports = auth;
