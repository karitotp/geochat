/* Librerias necesarias para la aplicación */
var express = require('express');
var app = express();
var path = require('path');


var http = require('http').Server(app);
var io   = require('socket.io')(http);


//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'views'))); 


//app.get('*', function(req, res) {
 // res.sendFile( __dirname + '/views');
//});


/** *** *** ***
 *  Configuramos Socket.IO para estar a la escucha de
 *  nuevas conexiones.
 */
io.on('connection', function(socket) {
  
  console.log('New user connected');
  
  /**
   * Cada nuevo socket debera estar a la escucha
   * del evento 'chat message', el cual se activa
   * cada vez que un usuario envia un mensaje.
   * 
   * @param  msg : Los datos enviados desde el cliente a 
   *               través del socket.
   */
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  
  /**
   * Mostramos en consola cada vez que un usuario
   * se desconecte del sistema.
   */
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  
});


/**
 * Iniciamos la aplicación en el puerto 3000
 */
http.listen(8080, function() {
  console.log('listening on :8080');
});