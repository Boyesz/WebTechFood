var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/Manager', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _id : Schema.ObjectId,
    totalCost : Number,
    status : String,
    received : Boolean,
    fulfilled: String
});

module.exports = db.model('orders',OrderSchema);