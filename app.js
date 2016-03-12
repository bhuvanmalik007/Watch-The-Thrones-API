var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Episode = require('./models/episodeModel');
var WebTorrent = require('webtorrent');
var fs = require('fs');





//var http = require('http');
//var request = require('request');



var episodeRouter= require('./routes/episodeRouter')(Episode);


//var users = require('./routes/users');


var app = express();






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

var client = new WebTorrent();
//magnet:?xt=urn:btih:5481CEBA846DD4910A528451042E81EB95EFCB85&dn=electrical+engineering+101+you+should+have+learned+in+school+but+probably+didn+t+3rd+edition+2011+pdf+gooner&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce
// var magnetURI = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d';
//var magnetURI = 'magnet:?xt=urn:btih:0B29B734F49A663A4BA7FD22E95F8646A31EF20F&dn=rihanna+ft+drake+work+cdq+mp3&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';
//var magnetURI='magnet:?xt=urn:btih:24FC9FFEB5E75AD16C875D060F631FB596977242&dn=justin+bieber+what+do+you+mean+single+mp3+2015&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';
//var magnetURI='magnet:?xt=urn:btih:22D9C6EA80859D436FE0955FFCFBBF467AB1DDCC&dn=justin+bieber+sorry+lyrics+video+720p+jrr+truhd&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';



app.get('/:m',function(req,res){
 // console.log('starting');
  client.download(req.params.m, function (torrent) {


        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Content-disposition', 'attachment; filename=' + torrent.files[0].name);
        //res.send(buffer);
       var source = torrent.files[0].createReadStream();
     // var destination = fs.createWriteStream(path.resolve(".")+'/hello/'+file.name);
      source.pipe(res);
   // });
  });
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
