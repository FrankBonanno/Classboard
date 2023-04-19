require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT;

/* Request Listener */
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server Listening On Port ${PORT}...`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();
