
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}
var derp = rootRequire('/derp.js');
var derpVal = 50;


var server = require('http').createServer(handler);
var socketio = require('socket.io');
var fs = require('fs');

var path = require('path');
var async = require('async');
var io = socketio.listen(server);

var data = "";

function handler(req,res) {
    fs.readFile(__dirname + '/index.html', function (err,data) {
        if(err) {
            res.writeHead(500);
            return res.end('Error loading file index.html');
        }
        
        res.writeHead(200, 'OK');
        console.log('page sent');
        res.end(data);
    });
};

io.sockets.on('connection', function(socket) {
   
   socket.emit('message', { title: 'Servo Controller', value: derpVal});

   socket.on('message', function(data) {
       console.log(data['value']);
   });
   

   socket.on('news', function(data) {
       console.log('news');
       console.log(data['value']);
       derpVal = data['value'];
       socket.broadcast.emit('bounce', {beat: derpVal});
       derp.derpIt(derpVal);
   });
});





server.listen(8000 || process.env.PORT, "0.0.0.0" || process.env.IP, function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

