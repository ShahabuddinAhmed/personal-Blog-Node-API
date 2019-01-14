const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: { type: String, required: true },
    commentDate: { type: String, required: true },
    commentID: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('Comment', commentSchema);