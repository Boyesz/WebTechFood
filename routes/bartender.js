var mongoose = require('mongoose');

var db = require('./DB');

var Schema = mongoose.Schema;

var EmployeesSchema = new Schema({
    _id : Schema.ObjectId,
    name : String
});

module.exports = db.model('employee',EmployeesSchema);