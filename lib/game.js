(function() {
  var app, don, express, fs, io, page, son, sonsheet, styles, tic, util, views;

  express = require('express');

  app = express.createServer();

  fs = require('fs');

  util = require('util');

  tic = require('./public/js/tic.js').tic;

  don = require('./public/js/don.js').Don;

  views = require('./public/js/views.js').views;

  son = require('./public/js/son.js').Son;

  sonsheet = './public/css/styles.js';

  styles = require(sonsheet).styles;

  fs.writeFile('./public/css/styles.css', son.render(styles), function(err) {
    if (!err) return util.debug(sonsheet + " compiled to css");
  });

  page = {
    title: "Tic Tac Toe",
    body: "Example",
    js: ["/js/jquery", "/js/tic", "/socket.io/socket.io", "/js/don", "/js/client"],
    css: ["styles"]
  };

  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });

  app.get('/', function(req, res) {
    return res.send(don.render(page, views.layout));
  });

  app.listen(3000);

  io = require('socket.io').listen(app);
  io.sockets.on('connection', function (socket) {
    socket.on('newgame', function (data) {
      console.log("newgame: " + data);
      io.sockets.emit('newstate', data);
    });
    socket.on('move', function (data) {
      console.log("move: " + data);
      io.sockets.emit('newstate', data);
    });
  });

}).call(this);
