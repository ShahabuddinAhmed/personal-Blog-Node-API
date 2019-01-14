const mongoose = require('mongoose');

const catagorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    catagoryName: { type: String, required: true }
});

module.exports = mongoose.model('Catagory', catagorySchema);