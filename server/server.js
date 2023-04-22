require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT;

/* APP CONFIG */
app.use(morgan('dev'));

/* MIDDLEWARE */
app.use(express.json());

/* ROUTES */
app.get('/api', (req, res) => {
    res.send('Server Working!');
});

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
