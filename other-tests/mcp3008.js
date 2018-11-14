var rpio = require('rpio');

rpio.spiBegin();

for (let i = 0; i < 1000; i++) {
    // Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
    var sendBufferch0 = new Buffer([0x01, (8 + 0 << 4), 0x01]);
    var sendBufferch1 = new Buffer([0x01, (8 + 1 << 4), 0x01]);
    var sendBufferch2 = new Buffer([0x01, (8 + 2 << 4), 0x01]);

    // Send TX buffer to SPI MOSI and recieve RX buffer from MISO
    var recieveBufferch0 = new Buffer(8);
    var recieveBufferch1 = new Buffer(8);
    var recieveBufferch2 = new Buffer(8);
    rpio.spiTransfer(sendBufferch0, recieveBufferch0, sendBufferch0.length);
    rpio.spiTransfer(sendBufferch1, recieveBufferch1, sendBufferch1.length);
    rpio.spiTransfer(sendBufferch2, recieveBufferch2, sendBufferch2.length);

    // Extract value from output buffer. Ignore first byte. 
    var MSBch0 = recieveBufferch0[1],
        LSBch0 = recieveBufferch0[2];
    var MSBch1 = recieveBufferch1[1],
        LSBch1 = recieveBufferch1[2];
    var MSBch2 = recieveBufferch2[1],
        LSBch2 = recieveBufferch2[2];
    // Ignore first six bits of MSB, bit shift MSB 8 positions and 
    // finally add LSB to MSB to get a full 10 bit value
    var valuech0 = ((MSBch0 & 3) << 8) + LSBch0;
    var valuech1 = ((MSBch1 & 3) << 8) + LSBch1;
    var valuech2 = ((MSBch2 & 3) << 8) + LSBch2;

    console.log('ch' + ((sendBufferch0[1] >> 4) - 8), '=', valuech0);
    console.log('ch' + ((sendBufferch1[1] >> 4) - 8), '=', valuech1);
    console.log('ch' + ((sendBufferch2[1] >> 4) - 8), '=', valuech2);
}

rpio.spiEnd();