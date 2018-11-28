const opn = require('opn');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { receiveMessages, closeSubscription } = require('./receive.js')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('data', (data) => {
        let cloudData = JSON.parse(data.toString());
        if (cloudData.deviceId === "r2-d2-pi") {
            io.emit('data-r2', cloudData);
        } else {
            io.emit('data-bb', cloudData);
        }
    });
    socket.on('wine', (data) => {
        console.log(`wine-bot says: ${data}`);
        opn('https://beyerskloof.co.za/online-shop/?orderby=price&add-to-cart=139');
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
