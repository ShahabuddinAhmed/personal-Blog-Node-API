const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/users');
const addressBookRoutes = require('./api/routes/addressbook');

// mongoose.connect('mongodb://cost-counter:cost-counter@database-shard-00-00-v0ueh.gcp.mongodb.net:27017,database-shard-00-01-v0ueh.gcp.mongodb.net:27017,database-shard-00-02-v0ueh.gcp.mongodb.net:27017/OnlineAddressBook?ssl=true&replicaSet=database-shard-0&authSource=admin&retryWrites=true', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// });
mongoose.connect('mongodb://localhost:27017/PersonalBlog', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// morgan used for show colsole http request and error handleing
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // extended false means only parse url data.
app.use(bodyParser.json());

// Corese Origin Resource Sharing
app.use(cors());

// Routes which should handle request
app.use('/user', userRoutes);
app.use('/addressbook', addressBookRoutes);

// This meddileware Handle every http request error
// This error means could not find any route
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// passed 1st middleware error and check another error such database error 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;