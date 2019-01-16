const mongoose = require('mongoose');
const Catagories = require('../models/catagory');

exports.getAllCatagory = (req, res, next) => {
    Catagories.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "Catagory document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createCatagory = (req, res, next) => {
    const catagory = new Catagories({
        _id: new mongoose.Types.ObjectId(),
        catagoryName: req.body.catagoryName
    });
    catagory
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Catagory successfully is added'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.updateCatagory = (req, res, next) => {
    const id = req.params.catagoryID;
    Catagories.update({ _id: id }, { $set: {
        catagoryName: req.body.catagoryName
    }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Catagory is successfully updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.deteleteCatagory = (req, res, next) => {
    const id = req.params.catagoryID;
    Catagories.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Catagory is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}