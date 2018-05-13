var express = require('express');
var router = express.Router();
var food = require('./food');
var order = require('./order');
var customer = require('./customer');
var mongoose = require('mongoose');

router.get('/customer/listFoods',function(req,res){
    food.find({'type' : 'Food'}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.get('/customer/listDrinks',function(req,res){
    food.find({'type' : 'Drink'}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.post('/customer/getFoodByID',function(req,res){
    food.findById(req.body['_id']).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.post('/customer/getCustomerIDByName',function (req,res) {
    customer.findOne({'name' : req.body['name']}).exec(function (err,doc) {
        res.status(200).send(doc);
    })
})

router.post('/customer/orderFood',function (req,res) {
    order.create({
        _id: new mongoose.Types.ObjectId(),
        fulfilled : 'No',
        totalCost : req.body['totalCost'],
        status : 'Open',
        received : false,
        food_fk : req.body['food_fk'],
        customer_fk : req.body['customer_fk']
    }, function (err,doc) {
        if(err){
            return console.log(err);
        }
        console.log(err);
        console.log(doc);
        res.status(200).send(doc);
    });
})

module.exports = router;