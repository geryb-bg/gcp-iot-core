const raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
    io: new raspi()
});

board.on('ready', () => {
    const red = new five.Led('P1-15');
    const green = new five.Led('P1-13');
    const blue = new five.Led('P1-11');
    
    red.blink(500);
    green.blink(1000);
    blue.blink(1500);
});