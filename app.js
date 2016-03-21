var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Episode = require('./models/episodeModel');
var WebTorrent = require('webtorrent');
//var fs = require('fs');


var app = express();



//var http = require('http');
//var request = require('request');






//var users = require('./routes/users');











app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var episodeRouter= require('./routes/episodeRouter')(Episode);

var db = mongoose.connect('mongodb://root:admin@ds039684.mongolab.com:39684/apptest');



app.use('/season',episodeRouter);


//magnet:?xt=urn:btih:5481CEBA846DD4910A528451042E81EB95EFCB85&dn=electrical+engineering+101+you+should+have+learned+in+school+but+probably+didn+t+3rd+edition+2011+pdf+gooner&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce
// var magnetURI = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d';
//var magnetURI = 'magnet:?xt=urn:btih:0B29B734F49A663A4BA7FD22E95F8646A31EF20F&dn=rihanna+ft+drake+work+cdq+mp3&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';
//var magnetURI='magnet:?xt=urn:btih:24FC9FFEB5E75AD16C875D060F631FB596977242&dn=justin+bieber+what+do+you+mean+single+mp3+2015&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';
//var magnetURI='magnet:?xt=urn:btih:22D9C6EA80859D436FE0955FFCFBBF467AB1DDCC&dn=justin+bieber+sorry+lyrics+video+720p+jrr+truhd&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce';

var client=new WebTorrent();

app.get('/',function(req,res){
res.redirect('http://watchthethrone.herokuapp.com');
});

app.get('/:m',function(req,res){

 client.download(req.params.m, function (torrent) {
     var file;
     for(var i = 0; i < torrent.files.length; i++) {
         if (!file || file.length < torrent.files[i].length) {
             file = torrent.files[i];
         }
     }
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Content-disposition', 'attachment; filename=' + file.name);
       var source = file.createReadStream();
       source.pipe(res);

 });
});

//app.get('/stream/:m',function(req,res){
//
//    client.add(req.params.m, function (torrent) {
//
//        // Torrents can contain many files. Let's use the first.
//        var file = torrent.files[0];
//        var total = file.length;
//        if(typeof req.headers.range != 'undefined') {
//            var range = req.headers.range;
//            var parts = range.replace(/bytes=/, "").split("-");
//            var partialstart = parts[0];
//            var partialend = parts[1];
//            var start = parseInt(partialstart, 10);
//            var end = partialend ? parseInt(partialend, 10) : total - 1;
//            var chunksize = (end - start) + 1;
//        } else {
//            var start = 0; var end = total;
//        }
//
//        var stream = file.createReadStream({start: start, end: end});
//        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': total, 'Content-Type': 'video/mp4' });
//        stream.pipe(res);
//    //} catch (err) {
//    //    res.status(500).send('Error: ' + err.toString());
//    //}
//
//
//    });
//});




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
