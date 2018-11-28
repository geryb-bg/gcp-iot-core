const raspi = require('raspi-io');
const five = require('johnny-five');
const io = require('socket.io-client');

const socket = io('http://192.168.46.143:3000/');
const board = new five.Board({
    io: new raspi()
});

board.on('ready', () => {
    const button = new five.Button({
        board: board,
        pin: 'P1-11',
        invert: false
    });

    button.on('down', function() {
        console.log("opening...");
        socket.emit('wine', 'wine please');
    });
});