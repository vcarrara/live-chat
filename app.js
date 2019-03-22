let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    port = 8080;

// Functions
/*
let emit = _io => {
  setInterval(_io => {
    _io.emit('message', 'hello');
  }, 1000);
};
*/

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/chat.html');
});

io.sockets.on('connection', (socket, pseudo) => {
  socket.emit('connected', '');

  socket.on('new-user', pseudo => {
    pseudo = ent.encode(pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit('new-user', pseudo);
  });

  socket.on('message', message => {
    message = ent.encode(message);
    socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
  });
});

server.listen(port);

console.log('live-chat launched on port : ' + port)
