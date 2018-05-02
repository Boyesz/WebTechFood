var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/customer', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    customer_id : Schema.ObjectId,
    name : String,
    billing_address : String
});

module.exports = db.model('customers',CustomerSchema);