const mongoose = require('mongoose');
const Posts = require('../models/post');
const nl2br  = require('nl2br');

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

exports.getPublishedPost = (req, res, next) => {
    const id = 'Public';
    Posts.find({ postType: id })
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

exports.getOnePost = (req, res, next) => {
    const id = req.params.postID;
    Posts.findById(id)
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

exports.getPostType = (req, res, next) => {
    const id = req.params.postID;
    Posts.find({ postType: id })
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

exports.createPost = (req, res, next) => {
    const post = new Posts({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        article: nl2br(req.body.article, false),
        catagory: req.body.catagory,
        postType: req.body.postType,
        picture: req.body.picture,
        publishedDate: req.body.publishedDate
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
        picture: req.file.filename
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

exports.updateOneItem = (req, res, next) => {
    const id = req.params.postID;
    Posts.update({ _id: id }, { $set: {
        postType: req.body.postType
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