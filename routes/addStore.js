var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var Store = require('../models/store');

//add store function
/* ! CHANGE TO SETSTORE ! */
router.post("/", function(req, res, next){
    const store = new Store({
		_id: new mongoose.Types.ObjectId(),
        storeName: req.body.storeName
});
    store
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;