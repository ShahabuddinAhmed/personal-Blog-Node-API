const mongoose = require('mongoose');
const AboutWriters = require('../models/about-writer');

exports.getAboutWriter = (req, res, next) => {
    const id = req.params.aboutID;
    AboutWriters.findById(id)
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

exports.updateAboutWriter = (req, res, next) => {
    const id = req.params.aboutID;
    AboutWriters.update({ _id: id }, { $set: {
        name: req.body.name,
        about: req.body.about,
        picture: req.body.picture
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
