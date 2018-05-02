var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/order', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    order_id : Schema.ObjectId,
    totalCost : Number,
    status : String,
    received : Boolean
});

module.exports = db.model('orders',OrderSchema);