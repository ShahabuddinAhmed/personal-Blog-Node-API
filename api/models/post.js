const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    article: { type: String, required: true },
    catagory: { type: String, required: true },
    postType: { type: String, required: true },
    picture: { type: String, default: 'image.jpg' },
    publishedDate: { type: String, required: true }
});

module.exports = mongoose.model('Posts', postSchema);