const mongoose = require('mongoose');
const Replays = require('../models/replay');

exports.createReplay = (req, res, next) => {
    const replay = new Replays({
        _id: new mongoose.Types.ObjectId(),
        replay: req.body.replay,
        replayDate: req.body.replayDate,
        replayID: req.body.replayID
    });
    replay
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Replay successfully is added'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.getOneReplay = (req, res, next) => {
    const id = req.params.replayID;
    Replays.find({ replayID: id })
    .exec()
    .then(doc => {
        if(doc) {
            console.log("From database", doc);
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "No data is found by provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.updateReplay = (req, res, next) => {
    const id = req.params.replayID;
    Replays.update({ _id: id }, { $set: {
        replay: req.body.replay,
        replayDate: req.body.replayDate,
        replayID: req.body.replayID
    }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Data is successfully updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.deteleteReplay = (req, res, next) => {
    const id = req.params.replayID;
    Replays.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "replay is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}