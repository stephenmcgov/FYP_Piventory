var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var Report = require('../models/reports');

//add store function
router.post("/", function(req, res, next){
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