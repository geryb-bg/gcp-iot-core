# 1. Light sensor
## Code
1. `photo1` - import onoff library for photocell
1. `photo2` - Turn on the GPIO pin that will power the photocell
1. `photo3` - Get the reading from the amount of light
1. `photo4` - Call the light reading function every 1 second

## Copy to pi
### Local
1. `scp photocell.js pi@bbd-bb-8.local:~/gcp-iot-core/light-sensor`
1. `ssh pi@bbd-bb-8.local`

### Pi
1. `cd gcp-iot-core/light-sensor`
1. `ls` - show package.json
1. `sudo node photocell.js`

# 2. Temperature sensor
## Code
1. `temp1` - Initialise library and sensor
1. `temp2` - Get the readings and print them to the console
1. `temp3` - Calculate the gas reference
1. `temp4` - Calculate air quality
1. `temp5` - Calling calculate air quality and get gas reference
1. `temp6` - Initial call of gas ref and interval for all data

## Copy to pi
### Local
1. `scp weather.js pi@bbd-bb-8.local:~/gcp-iot-core/weather`

### Pi
1. `cd ..`
1. `cd weather`
1. `ls` - show package.json
1. `sudo node weather.js`

# 3. Send messages
## Code
1. show args.js

### Photocell
1. delete else
1. put setup in function called `initPower`
1. `setup1` - Add module exports to photocell.js

### Weather
1. delete interval and getGasReference
1. delete console logs
1. `setup2` - Add return data in measure all
1. `setup3` - Add module exports to weather.js

### Index
1. `comb1` - Import all required libraries
1. `comb2` - Constants required for connecting to GCP IoT
1. `comb3` - Create a JWT
1. `comb4` - Create connection arguments
1. `comb5` - Connect to mqtt and subscribe to device
1. `comb6` - Connect to client
1. `comb7` - Publish message to events route
1. `comb8` - Initializing power to photocell and setting up interval
1. `comb9` - Closing connection to mqtt

## Copy to Pi
### Local
1. `scp args.js pi@bbd-bb-8.local:~/gcp-iot-core/combined`
1. `scp photocell.js pi@bbd-bb-8.local:~/gcp-iot-core/combined`
1. `scp weather.js pi@bbd-bb-8.local:~/gcp-iot-core/combined`
1. `scp index.js pi@bbd-bb-8.local:~/gcp-iot-core/combined`

### Pi
1. `cd ..`
1. `cd combined`
1. `ls` - show package.json
1. `sudo node index.js`