
var net = require('net');
//var bb = require('bonescript');

var HTTPsocket = require('./HTTPsockets.js');
var db = require('./database.js');

var PORT = 6969;
var HOST = '127.0.0.1';

var server;
var _socket;

exports.init = function(){
	server = net.createServer().listen(PORT,HOST);
	
	console.log('TCP server started on ' + HOST + ':' + PORT );

	server.on('connection',function(sock){
		_socket = sock;
		console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
		
		sock.on('data',function(data){
			console.log('DATA ' + sock.remoteAddress + ': ' + data);
			var data = ""+data;
			var message = data.split(':');
			var outputData = {
				"command" : message[0],
				"param" : message[1] 
			};

			
			db.AddCommand("littlePLC",outputData.command, outputData.param);

			HTTPsocket.send('TCPevent',outputData);
			sock.write('Naredba "' + data +'" primljena');
		});


		
		sock.on('close',function(data){
			console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
		});
	});
};

exports.send = function(data){
	if(_socket)
		_socket.write(data);
}





 
 


