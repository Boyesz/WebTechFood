var mongoose = require('mongoose');
var db = require('./DB');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name : String,
    price : Number,
    type : String
});

module.exports = db.model('food',FoodSchema);