const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    about: { type: String, required: true },
    picture: { type: String, default: 'image.jpg' }
});

module.exports = mongoose.model('About', aboutSchema);