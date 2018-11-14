const PubSub = require('@google-cloud/pubsub');
const io = require('socket.io-client');

const pubsub = new PubSub({
    projectId: 'iot-cloud-stuff',
    keyFilename: '../service-account/iot-service-acc.json'
});
const subscriptionName = 'iot-subscription';
const subscription = pubsub.subscription(subscriptionName);

const socket = io('http://localhost:3000');
const messageHandler = (message) => {
    socket.emit('data', message.data);
    message.ack();
};

function receiveMessages() {
    subscription.on(`message`, messageHandler);
}

function closeSubscription() {
    subscription.removeListener('message', messageHandler);
}

module.exports = { closeSubscription, receiveMessages };