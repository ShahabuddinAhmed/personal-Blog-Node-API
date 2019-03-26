const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const postRoutes = require('./api/routes/post');
const CommentRoutes = require('./api/routes/comment');
const replaytRoutes = require('./api/routes/replay');
const aboutWriterRoutes = require('./api/routes/about-writer');
const catagoryRoutes = require('./api/routes/catagory');

mongoose.connect('mongodb://localhost:27017/PersonalBlog', {
    useNewUrlParser: true,
    useCreateIndex: true
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/post', postRoutes);
app.use('/comment', CommentRoutes);
app.use('/replay', replaytRoutes);
app.use('/about', aboutWriterRoutes);
app.use('/catagory', catagoryRoutes);
app.use(express.static('public'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;