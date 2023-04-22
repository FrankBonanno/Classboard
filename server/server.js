require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT;

/* APP CONFIG */
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

/* MIDDLEWARE */
app.use(express.json());

/* ROUTES */
app.use('/api/classes', coursesRouter);

/* ERROR HANDLING */
app.use(notFound);
app.use(errorHandler);

/* Request Listener */
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server Listening On Port ${PORT}...`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();
