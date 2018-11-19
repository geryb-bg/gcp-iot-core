const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { receiveMessages, closeSubscription } = require('./receive.js')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('data', (data) => {
        io.emit('data', JSON.parse(data.toString()));
    });
});

http.listen(3000, function () {
    receiveMessages();
    console.log('listening on *:3000');
});

process.on('SIGINT', function() {
    console.log('Closing connection. Goodbye!');
    closeSubscription();
    process.exit();
});