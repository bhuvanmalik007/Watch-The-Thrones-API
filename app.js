var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Episode = require('./models/episodeModel');

var http = require("http");
//var request = require('request');



var episodeRouter= require('./routes/episodeRouter')(Episode);


//var users = require('./routes/users');


var app = express();


var options = {
  host: 'http://dl.farsimovie.org',
  //method: 'HEAD',
  port: 80,
  path: '/Serial/GameofThrones/S01/Game.of.Thrones.S01E01.480p.mkv'
};



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var db = mongoose.connect('mongodb://root:admin@ds039684.mongolab.com:39684/apptest');



app.use('/season',episodeRouter);

app.get('/size',function(reqt,resp){

  http.get(options, function(res) {
    console.log("Got response: " + res.statusCode);

    for(var item in res.headers) {
      console.log(item + ": " + res.headers[item]);
    }
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

});


app.get('/',function(req,res){
  res.send("Welcome to Watch The Thrones");
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
