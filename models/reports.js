var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var reportSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
	storeName: { 
		type: String,
		required: true
	},
	staffName: { 
		type: String,
		required: true
	},
	shiftStart: { 
		type: String,
		required: true 
	},
	shiftEnd: { 
		type: String,
		required: true 
	},
	BOD_Float: { 
		type: Number,
		min: 0,
		required: true
	},
	EOD_Float: { 
		type: Number,
		min: 0,
		required: true
	},
	EOD_CashTotal: { 
		type: Number,
		min: 0,
		required: true
	},
    EOD_Total: { 
		type: Number,
		min: 0,
		required: true
	},
    EOD_Cash: { 
		type: Number,
		min: 0,
		required: true
	},
    EOD_Card: { 
		type: Number,
		min: 0,
		required: true
	},
    EOD_Other: { 
		type: Number,
		min: 0,
		required: true
	},
	Expenses: { 
		type: Number,
		min: 0,
		required: true
	},
	floatDiff: { 
		type: Number,
		required: true
	},
    Curr_Date: { 
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Report', reportSchema);