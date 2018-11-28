const Gpio = require('onoff').Gpio;
const io = require('socket.io-client');

const socket = io('http://192.168.46.143:3000/');
const button = new Gpio(4, 'in', 'rising', { debounceTimeout: 30 });
let counter = 0;
let myTimeout;

button.watch((err, value) => {
    counter++;
    if (counter > 12) {
        if (!myTimeout) {
            console.log("Setting timeout...");
            myTimeout = setTimeout(() => {
                counter = 0;
                myTimeout = null;
                console.log("Clearing timeout");
            }, 60000)
        } else {
            console.log("Please wait 1 minute before trying to order more wine");
        }
    } else {
        console.log("Opening...");
        socket.emit('wine', 'wine please');
    }
});