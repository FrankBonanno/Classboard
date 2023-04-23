const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthError } = require('../errors');

const register = async (req, res) => {
    // Password Hashing In User Model
    const user = await User.create({ ...req.body });
    const token = user.genJWT();

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please Provide Email and Password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthError('Incorrect Email');
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new UnauthError('Incorrect Password');
    }

    const token = user.genJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
