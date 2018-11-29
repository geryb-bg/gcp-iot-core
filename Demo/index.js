'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');
const args = require('./args.js');
const { measureAll } = require('./weather.js');
const { initPower, getLightReading } = require('./photocell.js');

const MQTT_BRIDGE_HOSTNAME = 'mqtt.googleapis.com';
const MQTT_BRIDGE_PORT = 8883;
const ALGORITHM = 'RS256';

function createJwt(projectId, privateKeyFile, algorithm) {
    const token = {
        'iat': parseInt(Date.now() / 1000),
        'exp': parseInt(Date.now() / 1000) + 20 * 60,
        'aud': projectId
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, { algorithm: algorithm });
}

const mqttClientId = `projects/${args.projectId}/locations/${args.cloudRegion}/registries/${args.registryId}/devices/${args.deviceId}`;

let connectionArgs = {
    host: MQTT_BRIDGE_HOSTNAME,
    port: MQTT_BRIDGE_PORT,
    clientId: mqttClientId,
    username: 'unused',
    password: createJwt(args.projectId, args.privateKeyFile, ALGORITHM),
    protocol: 'mqtts',
    secureProtocol: 'TLSv1_2_method'
};

let client = mqtt.connect(connectionArgs);
client.subscribe(`/devices/${args.deviceId}/config`, { qos: 1 });

const mqttTopic = `/devices/${args.deviceId}/events`;
async function publishAsync() {
    let data = await measureAll();
    data.lightReading = getLightReading(21);
    data.deviceId = args.deviceId;
    console.log(JSON.stringify(data));
    client.publish(mqttTopic, JSON.stringify(data), { qos: 1 }, (err) => {
        if (err)
            console.log(err);
        else
            console.log('message published: ', JSON.stringify(data));
    });
}

client.on('connect', (success) => {
    console.log('connect');
    if (!success) {
        console.log('Client not connected...');
    } else {
        initPower();
        setInterval(() => {
            publishAsync();
        }, 5000);
    }
});

process.on('SIGINT', () => {
    console.log('Closing connection to MQTT. Goodbye!');
    client.end();
    process.exit();
});