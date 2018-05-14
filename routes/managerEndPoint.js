var express = require('express');
var router = express.Router();
var food = require('./food');
var bartender = require('./bartender');
var order = require('./order');
var customer = require('./customer');
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

router.get('/manager/listOrders',function(req,res){
    order.find({}).populate('customer_fk').populate('food_fk').exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

module.exports = router;

router.get('/manager/profit',function(req,res){

    order.find({status: 'Open'}).exec(function(err,orders){
        if(err){
            console.log(err);
            return;
        }
        var sumPrice = 0;
        orders.forEach(function (order) {
            sumPrice += order.totalCost;
        });
        res.status(200).send({totalPrice: sumPrice});
    });
});

router.get('/manager/cleanProfit',function(req,res){

    order.find({}).exec(function(err,orders){
        if(err){
            console.log(err);
            return;
        }
        var sumPrice = 0;
        orders.forEach(function (order) {
            sumPrice += order.totalCost;
        });
        res.status(200).send({totalPrice: sumPrice});
    });
});

router.get('/manager/sumProfit',function(req,res){

    order.find({}).exec(function(err,orders){
        if(err){
            console.log(err);
            return;
        }
        var sumPrice = 0;
        orders.forEach(function (order) {
            sumPrice += order.totalCost;
        });
        res.status(200).send({totalPrice: sumPrice});
    });
});