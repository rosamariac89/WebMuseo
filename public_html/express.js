var express = require('express');
var mysql = require('mysql');
var mysqltorest  = require('mysql-to-rest');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var port = 8000;
var cors=require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'rosamaria',
    password: '89roxy89',
    database: 'DBMuseo'   
});
var api = mysqltorest(app,db);

app.listen(port, function () {
    console.log('Express server inizializzato sulla porta ' + port+'. API REST esposte dal Db');
});