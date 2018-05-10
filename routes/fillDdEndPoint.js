var express = require('express');
var router = express.Router();
var food = require('./food');
var order = require('./order');
var bartender = require('./bartender');
var customer = require('./customer');
var mongoose = require('mongoose');

router.get('/adminDB/addDatas',function(req,res){
    for(var i=0; i<10; i++)
    {
        var order_id_gen = new mongoose.Types.ObjectId();
        var food_id_gen = new mongoose.Types.ObjectId();
        var employee_id_gen = new mongoose.Types.ObjectId();
        var customer_id_gen = new mongoose.Types.ObjectId();
        if(i<5)
        {
            food.create({
                name : 'test' + i,
                ingredients : ['test','test'],
                price : i*100,
                type: 'Food',
                _id : food_id_gen
            },function (err) {
                if(err){
                    return console.log(err);
                }});
        }
        else {
            food.create({
                name : 'test' + i,
                ingredients : ['test','test'],
                price : i*100,
                type: 'Drink',
                _id : food_id_gen
            },function (err) {
                if(err){
                    return console.log(err);
                }
            });
        }
        order.create({
            _id : order_id_gen,
            totalCost : i*100,
            status : 'Close',
            received : true,
            fulfilled: 'Yes',
            food_fk : food_id_gen,
            employee_fk : employee_id_gen,
            customer_fk : customer_id_gen
        },function (err) {
            if(err){
                return console.log(err);
            }
        });
        customer.create({
            _id : customer_id_gen,
            name : 'Test Jakab' + i,
            billing_address : 'Test Strasse ' + i
        },function (err) {
            if(err){
                return console.log(err);
            }
        });
        bartender.create({
            _id : employee_id_gen,
            name : 'Test Tender' + i
        },function (err) {
            if(err){
                return console.log(err);
            }
        });
    }
    res.sendStatus(200);
});

module.exports = router;