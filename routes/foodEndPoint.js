var express = require('express');
var router = express.Router();
var food = require('./food');
var mongoose = require('mongoose');

router.post('customer/createFood',function (req,res) {
    order.create({
        name : req.body["name"],
        ingredients : req.body["ingredients"],
        price : req.body["price"],
        type : req.body["type"],
        food_id : Number
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