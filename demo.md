# 1. Light sensor

## Code

1. `photo1` - import onoff library for photocell
1. `photo2` - Turn on the GPIO pin that will power the photocell
1. `photo3` - Get the reading from the amount of light
1. `photo4` - Call the light reading function every 1 second

## Copy to pi

1. `ssh pi@bbd-bb-8.local`
1. `cd gcp-iot-core/light-sensor`
1. `ls` - show package.json and mention onoff library 
1. `scp photocell.js pi@bbd-r2-d2.local:~/gcp-iot-core/light-sensor`
1. `sudo node photocell.js`

# 2. Temperature sensor

## Code

1. `temp1` - Initialise library and sensor
1. `temp2` - Get the readings and print them to the console
1. `temp3` - Calculate the gas reference
1. `temp4` - Calculate air quality
1. `temp5` - Calling calculate air quality and get gas reference
1. `temp6` - Initial call of gas ref and interval for all data

# 3. Send messages

# 4. Receive messages