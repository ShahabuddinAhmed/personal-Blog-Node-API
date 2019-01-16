const mongoose = require('mongoose');
const Comments = require('../models/comment');

exports.createComment = (req, res, next) => {
    const comment = new Comments({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        commentDate: req.body.commentDate,
        commentID: req.body.commentID
    });
    comment
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Data successfully is added'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.getOneComment = (req, res, next) => {
    const id = req.params.commentID;
    Comments.findById(id)
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

exports.updateComment = (req, res, next) => {
    const id = req.params.commentID;
    Comments.update({ _id: id }, { $set: {
        comment: req.body.comment,
        commentDate: req.body.commentDate,
        commentID: req.body.commentID
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

exports.deteleteCommant = (req, res, next) => {
    const id = req.params.commentID;
    Comments.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Comment is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}