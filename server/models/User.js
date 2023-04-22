const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please Provide Your Full Name'],
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: [true, 'Please Provide An Email'],
        minlength: 4,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Provide A Valid Email Address',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 6,
    },
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

/* Generate JWT func */
UserSchema.methods.genJWT = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

// Compare Password Function
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
