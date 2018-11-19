'use strict';

const { BME680 } = require('jvsbme680');

const bme680 = new BME680();

const gas_lower_limit = 5000;   // Bad air quality limit
const gas_upper_limit = 50000;  // Good air quality limit 
const hum_reference = 40;

let gas_reference = 250000;

async function getGasReference() {
    for (let i = 0; i <= 10; i++) {
        let readings = await bme680.read();
        gas_reference += readings.gasResistance;
    }
    gas_reference = gas_reference / 10;
    console.log("New gas reference: ", gas_reference);
}

async function measureAll() {
    try {
        const { gasResistance, humidity, pressure, temperature } = await bme680.read();
        console.log(`Gas resistance (Ohms): ${gasResistance}`);
        console.log(`Humidity (%RH): ${humidity}`);
        console.log(`Pressure (hPa): ${pressure}`);
        console.log(`Temperature (degrees C): ${temperature}`);

        console.log(`Air Quality: ${calculateAirQuality(gasResistance, humidity)}`);
        await getGasReference();
    } catch (err) {
        console.error(`Failed to read data: ${err}`);
    }
}

function calculateAirQuality(gasResistance, humidity) {
    let hum_score;
    if (humidity >= 38 && humidity <= 42)
        hum_score = 0.25 * 100;
    else {
        if (humidity < 38)
            hum_score = 0.25 / hum_reference * humidity * 100;
        else {
            hum_score = ((-0.25 / (100 - hum_reference) * humidity) + 0.416666) * 100;
        }
    }

    if (gas_reference > gas_upper_limit)
        gas_reference = gas_upper_limit;
    if (gas_reference < gas_lower_limit)
        gas_reference = gas_lower_limit;
    let gas_score = (0.75 / (gas_upper_limit - gas_lower_limit) * gas_reference - (gas_lower_limit * (0.75 / (gas_upper_limit - gas_lower_limit)))) * 100;

    //Combine results for the final IAQ index value (0-100% where 100% is good quality air)
    return hum_score + gas_score;
}

getGasReference();
setInterval(() => {
    measureAll();
}, 5000);