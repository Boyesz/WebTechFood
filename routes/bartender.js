var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/employee', {autoIndex : true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB is Open');
});


var Schema = mongoose.Schema;

var EmployeesSchema = new Schema({
    employee_id : Schema.ObjectId,
    name : String
});

module.exports = db.model('employees',EmployeesSchema);