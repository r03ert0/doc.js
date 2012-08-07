// Load external node.js modules
var express = require('express')
, http = require('http')
, fs = require('fs')
, config = require('./config');

// Express framework settings
var app = express();
app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});
app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
    fs.readFile(__dirname + '/../../index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.get('/doc.js', function(req, res){
    fs.readFile(__dirname + '/../../doc.js', 'utf8', function(err, text){
        res.send(text);
    });
});

// Start Webserver
var server = http.createServer(app).listen(config.port);
console.log("Express server listening on port "+config.port);
