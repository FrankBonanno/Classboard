require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');

const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT;

/* APP CONFIG */
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

/* MIDDLEWARE */
app.use(cookieParser());
app.use(express.json());

/* ROUTES */
app.use('/api/auth', authRouter);
app.use('/api/courses', authMiddleware, coursesRouter);

/* ERROR HANDLING */
app.use(notFound);
app.use(errorHandler);

/* Request Listener */
const start = async () => {
    try {
        console.log(chalk.yellow('Connecting to Mongo...'));
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server ${chalk.green('Listening')} On Port: ${chalk.red.underline(PORT)}`);
        });
    } catch (err) {
        console.error(err);
    }
};
start();
