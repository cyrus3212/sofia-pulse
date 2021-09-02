// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
const authRoute = require('./routes/auth');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI || 'mongodb://localhost/sofia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan('tiny'));
app.use('/auth', authRoute);
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));