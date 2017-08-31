console.log('1');
// Connect to server
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});
var fs = require('fs');

console.log('2');

// Add a connect listener
socket.on('connect', function() { 
	console.log('Connected!');
});
 
fs.watchFile('./stream/image_stream.jpg', function(current, previous) {

	fs.readFile('./stream/image_stream.jpg', function (err,data) {
		if (err) {
			return console.log(err);
		}
        var msg ={};
        msg.fileName = 'image_stream.jpg'
        msg.file = data
        socket.emit('liveStream', msg);
        console.log('sending file2..')
        console.log(data);
	});

	//socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
	//console.log('Sending file...');
});

console.log('3');


