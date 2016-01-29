/* Librerias necesarias para la aplicación */
var express = require('express');
var app = express();
var path = require('path');


var http = require('http').Server(app);
var io   = require('socket.io')(http);



app.use(express.static(path.join(__dirname, 'views'))); 

io.on('connection', function(socket) {
  
  console.log('New user connected');

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  
});
http.listen(8080, function() {
  console.log('listening on :8080');
});