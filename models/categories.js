var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: { type: String },    
});

module.exports = mongoose.model('Category', productSchema);