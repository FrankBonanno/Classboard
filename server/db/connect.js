const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = (url) => {
    console.log(chalk.cyan('Connected To MongoDB!'));
    mongoose.set('strictQuery', true);

    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
