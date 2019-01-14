const mongoose = require('mongoose');

const replaySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    replay: { type: String, required: true },
    replayDate: { type: String, required: true },
    replayID: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('Replay', replaySchema);