var express = require('express');
var router = express.Router();
var food = require('./food');
var order = require('./order');
var mongoose = require('mongoose');

router.get('/manager/queryOrders',function(req,res){
    order.find().
    populate(['food_fk', 'employee_fk','customer_fk']).
    exec(function(err, doc) {
        if(err) {
            res.status(400);
            console.log(err);
            return;
        }
        res.status(200).send(doc);
    });
});

router.get('/manager/showMoneyStatistic',function (req,res) {
    /*order.find({}).sum('totalCost').populate('food').group('food.type').exec(function (err, doc) {
        res.status(200).send(doc);
    });*/

    order.populate('foods').aggregate([
        {
            $group:{
                _id: $food.type,
                count: {$sum: $totalCost}
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.status(200).send(result);
        }
    })
});

router.get('manager/showTrafficStatistic',function (req,res) {

})

module.exports = router;