var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var Report = require('../models/reports');
const { check, validationResult } = require('express-validator');

//add store function
router.post("/", [
    check("storeName").exists().not().isEmpty().trim().escape(),
    check("staffName").exists().not().isEmpty().trim().escape(),
    check("shiftStart").exists().not().isEmpty().trim().escape(),
    check("shiftEnd").exists().not().isEmpty().trim().escape(),
    check("BOD_Float").exists().not().isEmpty().trim().escape(),
    check("EOD_Float").exists().not().isEmpty().trim().escape(),
    check("EOD_Total").exists().not().isEmpty().trim().escape(),
    check("EOD_CashTotal").exists().not().isEmpty().trim().escape(),
    check("EOD_Card").exists().not().isEmpty().trim().escape(),
    check("Other").exists().not().isEmpty().trim().escape(),
    check("Expenses").exists().not().isEmpty().trim().escape(),
    check("floatDiff").exists().not().isEmpty().trim().escape(),
    check("Curr_Date").exists().not().isEmpty().trim().escape()
], function(req, res, next){
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If error occurs, handel it here    
        res.send(errors)
    }

    const report = new Report({
        _id: new mongoose.Types.ObjectId(),
        storeName: req.body.storeName,
		staffName: req.body.inputStaffName,
		shiftStart: req.body.inputShiftStart,
		shiftEnd: req.body.inputShiftEnd,
		BOD_Float: req.body.inputBOD_Float,
		EOD_Float: req.body.inputEOD_Float,
		EOD_Total: req.body.inputTotal,
		EOD_CashTotal: req.body.inputCashTotal,
		EOD_Cash: req.body.inputEOD_Cash,
		EOD_Card: req.body.inputEOD_Card,
		EOD_Other: req.body.inputEOD_Other,
		Expenses: req.body.inputEOD_Expenses,
		floatDiff: req.body.inputfloatDiff,
		Curr_Date: req.body.inputCurr_Date
});
    report
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/reports');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;