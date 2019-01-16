const mongoose = require('mongoose');
const Posts = require('../models/post');

exports.getAllPost = (req, res, next) => {
    Posts.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "Users document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createPost = (req, res, next) => {
    const post = new Posts({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        article: req.body.article,
        catagory: req.body.catagory,
        postType: req.body.postType,
        picture: req.body.picture,
        publishedDate: req.body.publishedDate,
    });
    post
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post successfully is added'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.updatePost = (req, res, next) => {
    const id = req.params.postID;
    Posts.update({ _id: id }, { $set: {
        title: req.body.title,
        article: req.body.article,
        catagory: req.body.catagory,
        postType: req.body.postType,
        picture: req.body.picture,
        publishedDate: req.body.publishedDate,
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

exports.deteletePost = (req, res, next) => {
    const id = req.params.postID;
    Posts.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Post is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}