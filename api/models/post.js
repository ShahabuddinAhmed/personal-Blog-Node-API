const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    article: { type: String, required: true },
    catagory: { type: String, required: true },
    postType: { type: String, required: true },
    picture: { type: String, default: 'image.jpg' },
    publishedDate: { type: String, required: true },
    facebook: { type: number, default: 0 },
    linkedin: { type: number, default: 0 },
    twiter: { type: number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);