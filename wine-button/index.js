const opn = require('opn');
const raspi = require('raspi-io');
const five = require('johnny-five');
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
        opn('https://beyerskloof.co.za/online-shop/?orderby=price&add-to-cart=139');
    });
});