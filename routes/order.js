var mongoose = require('mongoose');
var db = require('./DB');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _id : Schema.Types.ObjectId,
    totalCost : Number,
    status : String,
    received : Boolean,
    fulfilled: String,
    food_fk : [{type: Schema.Types.ObjectId , ref: 'food'}],
    employee_fk : { type: Schema.Types.ObjectId, ref: 'employee'},
    customer_fk: { type: Schema.Types.ObjectId, ref: 'customer'}
});

module.exports = db.model('order',OrderSchema);