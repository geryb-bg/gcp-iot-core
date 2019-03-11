const gpio = require("onoff").Gpio;

function getLightReading(pin) {
  let reading = 0;
  let sensor = new gpio(pin, "out");
  sensor.write(0, err => {
    if (err) console.log(err);
  });

  sensor = new gpio(pin, "in", "both");
  while (sensor.readSync() == false) {
    reading++;
  }
  return reading;
}

function initPower() {
  let onPin = new gpio(5, "out");
  onPin.write(1, err => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = { initPower, getLightReading };