var express = require('express');
var router = express.Router();
var order = require('./order');
var mongoose = require('mongoose');

router.get('/bartender/listOpenOrders',function(req,res){
    order.find({status : 'Open'}).exec(function(err, doc) {
        res.status(200).send(doc);
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