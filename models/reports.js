var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var reportSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
	storeName: { type: String},
	staffName: { type: String},
	shiftStart: { type: String},
	shiftEnd: { type: String},
	BOD_Float: { type: Number},
	EOD_Float: { type: Number},
	EOD_CashTotal: { type: Number},
    EOD_Total: { type: Number},
    EOD_Cash: { type: Number},
    EOD_Card: { type: Number},
    EOD_Other: { type: Number},
	Expenses: { type: Number},
	floatDiff: { type: Number},
    Curr_Date: { type: Date}
});

module.exports = mongoose.model('Report', reportSchema);