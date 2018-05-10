var express = require('express');
var router = express.Router();
var food = require('./food');
var order = require('./order');
var mongoose = require('mongoose');

router.get('/customer/listAllFoods',function(req,res){
    food.find().exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.get('/customer/listDrinks',function(req,res){
    food.find({'type' : 'drink'}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.post('customer/orderFood',function (req,res) {
    order.create({
        _id: new mongoose.Types.ObjectId(),
        fulfilled : req.body['fulfilled'],
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
        res.status(415).send(err +' '+doc);
    });
})

module.exports = router;