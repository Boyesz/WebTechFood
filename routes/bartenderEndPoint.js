var express = require('express');
var router = express.Router();
var order = require('./order');
var mongoose = require('mongoose');

router.get('/bartender/listOpenOrders',function(req,res){
    order.find({status : 'open'}).exec(function(err, doc) {
        res.status(200).send(doc);
    });
});

router.post('/bartender/fullFillOrder',function(req,res){

    order.find({'employee_id' : req.body['employee_id']}).exec(function(err,orders){
        if(err){
            console.log(err);
        }
        for(var i = 0; i < orders.length; i++){
            orders[i].status = req.body['status'];
            orders[i].received = req.body['received'];
            orders[i].totalCost = req.body['totalCost'];
            orders[i].employee_id = req.body['order_id'];
            orders[i].save();
        }
        res.status(200).send(orders);
    });
});

module.exports = router;