const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");

//delete product function
router.post("/", (req, res, next) => {
    const name = req.body.deleteName;
    console.log("routes function");
    console.log(req.body);
    console.log('name=' + name);
    Product.deleteOne({'name': name})
        .select('name price stockCount description category _id productImage')
        .exec()
        .then(doc => {
            res.redirect('/management');
			console.log("From database", doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;

