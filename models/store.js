var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var storeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    storeName: { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Store', storeSchema);