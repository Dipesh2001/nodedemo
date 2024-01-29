require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require('./db/connection');
const connectDB = require('./db/connection');
const router = require('./router');

const app = express();
const port = process.env.PORT || 8000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use('/uploads', express.static('uploads'));


const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();