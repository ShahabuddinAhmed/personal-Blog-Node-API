const mongoose = require('mongoose');
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {
    Users.find()
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

exports.registerUser = (req, res, next) => {
    Users.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if(user.length >=1) {
            return res.status(409).json({
                message: "This email is exit"
            });
        } else {
            bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new Users({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPicture: req.body.userPicture,
                        userPassword: hash
                    });
                    user
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
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.loginUser = (req, res, next) => {
    Users.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                        userName: user[0].userName,
                        userID: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).send({
                    token: token
                });
            } 
            return res.status(401).json({
                message: "Authentication failed"
            });  
        });
    });
}

exports.getOneUser = (req, res, next) => {
    const id = req.params.userID;
    Users.findById(id)
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

exports.updateUser = (req, res, next) => {
    const id = req.params.userID;
    bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            Users.update({ _id: id }, { $set: {
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPicture: req.body.userPicture,
                userPassword: hash
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
    });
}

exports.deteleteUser = (req, res, next) => {
    const id = req.params.userID;
    Users.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Data is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}