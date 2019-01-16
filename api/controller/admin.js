const mongoose = require('mongoose');
const Admins = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllAdmin = (req, res, next) => {
    Admins.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "Admin document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.registerAdmin = (req, res, next) => {
    Admins.find({adminEmail: req.body.adminEmail})
    .exec()
    .then(admin => {
        if(admin.length >=1) {
            return res.status(409).json({
                message: "This email is exit"
            });
        } else {
            bcrypt.hash(req.body.adminPassword, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const admin = new Admins({
                        _id: new mongoose.Types.ObjectId(),
                        adminName: req.body.adminName,
                        adminEmail: req.body.adminEmail,
                        adminPassword: hash
                    });
                    admin
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Data successfully is added',
                            result: result
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

exports.loginAdmin = (req, res, next) => {
    Admins.find({adminEmail: req.body.adminEmail})
    .exec()
    .then(admin => {
        if(admin.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.adminPassword, admin[0].adminPassword, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                        adminName: admin[0].adminName,
                        adminID: admin[0]._id
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

exports.getOneAdmin = (req, res, next) => {
    const id = req.params.adminID;
    Admins.findById(id)
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

exports.updateAdmin = (req, res, next) => {
    const id = req.params.adminID;
    bcrypt.hash(req.body.adminPassword, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            Admins.update({ _id: id }, { $set: {
                adminName: req.body.adminName,
                adminEmail: req.body.adminEmail,
                adminPassword: hash
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

exports.deteleteAdmin = (req, res, next) => {
    const id = req.params.adminID;
    Admins.remove({ _id: id })
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