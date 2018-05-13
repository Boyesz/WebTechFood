var express = require('express');
var router = express.Router();
var order = require('./order');
var mongoose = require('mongoose');

router.get('/bartender/listOpenOrders',function(req,res){
    order.find({status : 'Open'}).populate('customer_fk').populate('food_fk').exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.post('/bartender/sumOrders',function(req,res){

    order.find({customer_fk: req.body['customer_fk'], status: 'Open'}).exec(function(err,orders){
        if(err){
            console.log(err);
            return;
        }
        /*for(var i = 0; i < orders.length; i++){
            if(orders[i].customer_fk == req.body['customer_fk']){
                orders[i].totalCost = orders[i].totalCost + req.body['totalCost'];
            }
        }*/
        var sumPrice = 0;
        orders.forEach(function (order) {
            sumPrice += order.totalCost;
        });
        res.status(200).send({totalPrice: sumPrice});
    });
});

router.post('/bartender/fullFillOrder',function(req,res){

    order.find({'_id' : req.body['_id']}).exec(function(err,orders){
        if(err){
            console.log(err);
        }
        for(var i = 0; i < orders.length; i++){
            orders[i].status = 'Closed';
            orders[i].received = true;
            orders[i].fulfilled = 'Yes';
            orders[i].employee_fk = req.body['employee_fk'];
            orders[i].save();
        }
        res.status(200).send(orders);
    });
});

module.exports = router;