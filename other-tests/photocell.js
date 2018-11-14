const gpio = require('onoff').Gpio;

function RCtime(pin) {
    let reading = 0;
    let sensor = new gpio(pin, 'out');
    sensor.write(0, (err) => { if (err) console.log(err); });

    sensor = new gpio(pin, 'in', 'both');
    while (sensor.readSync() == false) {
        reading++;
    }
    return reading;
}

setInterval(() => {
    console.log(RCtime(18));
}, 1000);