// [START iot_relay_message_js]
"use strict";
const { google } = require("googleapis");

const projectId = "iot-cloud-stuff";
const cloudRegion = "europe-west1";
const messages = 0;

exports.relayCloudIot = function(event, callback) {
  console.log(
    event.data ? Buffer.from(event.data, "base64").toString() : "nothing"
  );
  if (event.data) {
    const record = Buffer.from(event.data, "base64").toString();

    let messagesSent = messages;
    messagesSent = messagesSent + 1;
    //   console.log(`${record.deviceId} ${record.registryId} ${messagesSent}`);

      const config = {
        cloudRegion: cloudRegion,
        deviceId: 'xinabox-cw02',
        registryId: 'iot-registry',
        hops: messagesSent
      };

    google.auth.getClient().then(client => {
        google.options({
          auth: client
        });
        console.log('START setDeviceConfig');
        const parentName = `projects/${projectId}/locations/${cloudRegion}`;
        const registryName = `${parentName}/registries/${config.registryId}`;
        const binaryData = Buffer.from(record).toString('base64');
        const request = {
          name: `${registryName}/devices/${config.deviceId}-rec`,
          versionToUpdate: 0,
          binaryData: binaryData
        };
        console.log('Set device config.');
        return google.cloudiot('v1').projects.locations.registries.devices.modifyCloudToDeviceConfig(request);
      }).then(result => {
        console.log(result);
        console.log(result.data);
      });
  }
};
// [END iot_relay_message_js]
