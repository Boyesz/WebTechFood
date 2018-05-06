var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bartender = require('./routes/bartenderEndPoint');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/',bartender);

app.listen(8080, function(){console.log("Server listens on 8080.")});