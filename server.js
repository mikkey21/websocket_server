// Load requirements
var http = require('http'),
io = require('socket.io');
var fs = require('fs');

// Create server & socket
var server = http.createServer(function(req, res)
{
  // Send HTML headers and message
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>Aw, snap! 404</h1>');
});
server.listen(8080);
io = io.listen(server);

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');

  socket.on('liveStream', function(msg){
    console.log('MSG', msg, msg.fileName,msg.file);

    fs.writeFile(msg.fileName, msg.file, "binary",function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	});
  });

  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});


