# Intro

Hello everybody, today I'm going to talk to you about the internet of things. Now I know you are all probably thinking, oh no, another buzz word talk. Just wait, she's going to try sell us some machine learning next, maybe a blue one. But no, I promise, this talk is not about buzz words.

First, a little bit about me. My name is Gergana, but I usually go by Gery because that's a bit easier to pronounce. I work for a company called BBD in the R&D team. A lot of people don't really know what we do in the R&D team, and it's not a really easy question to answer. On paper, we do specialized consulting, training and research, but on a daily basis, it ranges from building twitter walls, to racing cars with micro-services, to programming astromech droids.

There are two things I really love about my job, one of them is JavaScript. That's why I am one of the co-organizers of Jozi.JS. The other one is programming things, and that is why I am here today. I would like to show you where these two things meet.

Yes you heard me right, I am going to take two of the most temperamental things in the tech world, JavaScript and Electronics and force them to play nicely.

My journey into all of this started a few years ago when I got a BB-8 robot and tried to program it with JavaScript. That went really well, and I've done a few talks on it, but more recently I got a drone. It's the parrot bebop 2 and it comes with a bunch of cool stuff, including a JavaScript API. So after approximately 2 days of having this drone I decided to program it. Nothing complex, just lift off, hover, land. This is how the first run went...

I thought this was amazing, a little later that evening, when my husband came home I wanted to show him what I had done. It was already dark by this point, so I don't have that video, but I do have this tweet I wrote shortly afterwards...

So what I am saying is, when it comes to programming things with JavaScript. You should not be afraid to fly a drone into the garden wall every now and then.

IoT consists of four parts. There is the hardware, the actual physical devices, we will talk about the hardware a little bit, but we won't concentrate on it too much because after all we are software developers. Then there is the data these devices produce, and this is a very important part, because the more devices we have the more data we have to deal with. As the software people it is our responsibility to ensure that this data is safe and reliable. Then we get to the software itself, this is really the part that is most important for us. Just because we are writing software for devices, it does not mean that we should be ignoring all of the good software practices we know. And lastly, we have connectivity. Connectivity can be said to be the reason we call these devices smart. Being connected whether it is to another device or the internet means that the data that the devices produce can be made useful.

# Hardware

The hardware we are going to use today. Firstly, we will be using a raspberry pi. Why? Because it is one of the easier development boards to program.

Next, we have a photo resistor, which is a resistor which varies the amount of resistance it provides based on the amount on light. I was trying to figure out how exactly this works, until I came across a blog which said, I quote, "If you would like to know more about exactly what is happening here I suggest you Google it". So I decided that it was a hardware problem, and since the software was working I wasn't going to worry about it.

And lastly we have a temperature, humidity, pressure and gas sensor called a BME680. This is what the original sensor looks like, it's actually not a very simple little chip. All of the gold lines you see on it are pins that need to be connected in some way to your board this is difficult to do if you don't know much about circuits. However, there is a solution.

XinaBox is a company which takes chips like this one and turns them into lego like electronic chips. You can see how the connections are really simple and just fit together. This SW02 chip that you see over there is actually the same as the chip above.

Let me show you the actual hardware on my table here. I have two of them set up. One that we will program from scratch, that's this one over here. And one that is busy running, just incase everything fails, this way I still have something to show you.

# Data

With the photo resistor we can work out how dark or light it is in the room. With the BME680 we can calculate the temperature, pressure, humidity and gas resistance. This last one did not entirely make sense to me, why is gas measured in ohms. I did some investigation, I came across a number of complicated calculations referencing the molecular numbers of Oxygen, Carbon Dioxide and Nitrogen. And eventually I decided this is one of the many reasons I didn't study chemistry and gave up. So if anyone does know the answer, please come explain it to me later. 

Besides this, we can use the gas resistance and humidity to calculate the quality of the air in the room.

Ok, so we know what kind of data we can get, now how do we actually get it. Well this is where the fun part comes, we have to write some code.

# Software

Which brings us to the software. When you start researching IoT, the languages you normally come across are C or Python or C++. And I know there are reasons for this, when working with microchips you need low level, fast languages that can run your software with limited memory and processing power. The only problem is I don't actually know any of these languages, and yes, I could learn them, but then I would be required to learn two different things, hardware and a new programming language, in order to achieve one thing. So I did some more digging, and I found a solution to this problem. JavaScript.

Demo

Ok, so we have all of this data, but unless you are SSHed into the pi, you can't actually see this data anywhere. It's just being logged to the console. This is not very useful right.

# Connectivity

And this brings us to the last and probably most important part of IoT, the internet part. In order for a device to be considered smart it needs to be connected in some way. It needs to do something useful with the data that it is creating. When I was coming up with the idea for this talk, it wasn't for DevFest. I was actually planning on using, I don't know if I'm allowed to say this at this conference, I'll say it quietly, I was planning on using Azure. But then the GDG organizers asked me to speak here. So I thought, how am I going to make my talk more Googly. I considered this option... But I thought that might be frowned upon...

So I went for Google Cloud IoT Core instead.

There are two ways to get started here. You can create everything with the google cloud sdk or you can do the clicky way, with your browser. I tried both, the browser way was a bit easier for me because I didn't have to remember all of the commands.

It's pretty simple, you create a project, then when you click on IoT Core in the menu it asks you to enable the API. Once you've enabled the API it prompts you to create a device registry, when creating the registry you will also need to create pub sub topics for telemetry and state data. 

Next we have to create the devices, but before that we have to generate a public/private key pair. When connecting to Cloud IoT Core, each device creates a JSON Web Token (JWT) signed with its private key, which Cloud IoT Core authenticates using the device's public key. I chose to use an RS256 key, it seemed like the easiest, these are the two commands you run to create that. Then in the console when you are creating the device you have to paste the public key, or upload it. Something that you should keep in mind is that the name of the device can't be changed once it has been created, so you must make sure that it is something you will remember and something that makes sense to you. OK, let's go change our code so that we can post the data to the cloud.

Demo

Now we have our data in the cloud, we need to do something with it. Here again you have a number of options. Using the PubSub you can feed the data into cloud functions and make changes to the devices config and feed back to the device via IoT Core again. Using Data flow you can send the data onto big table and store it for later analysis. Or you can feed the data into big query and using that send it onto machine learning so that you can run some machine learning algorithms. An example they gave in one of this year's IO talks was using gas sensors similar to this one and placing them in different places around the office and notifying people when the air in an area becomes unhealthy. This is all possible and not that difficult to do, but since I am very persistent on this whole JavaScript is always the answer no matter the question, I am going to show you how to use JavaScript to get our data and put it onto a website.

So my last demo is a little bit different, I'm not going to live code this one. I'm just going to show you the code and then show you that it is running. So let's take a look.

So that doSomethingWithMessage that you see there. I chose to use socket io and just post the results to a web page. What's really cool about this message is it also comes with a bunch of attributes describing where it came from. So if you wanted to make sure that the device sending these messages is who it claims to be you could check message.attributes. Let's take a look at the code running.

Demo

# Real world examples

There are a few really cool real world examples as well. One is the amazon dash button, am I allowed to say that word here? Oh well, too late. This is a button that Amazon prime customers can use in the USA. When you run out of washing powder, for example, you would push the button and that would place an order for you for washing powder.

Another really useful implementation is the trolley tracking systems that some supermarkets are implementing. This uses a set of antennas around the shop and little tracking devices on the trolley to track when a trolley goes out of bounds.

And the last example I want to talk about is actually my favorite, because it has to do with beer. Beer keg tracking systems, there are a number of different implementations of this around the world. The least advanced just track the kegs so that the breweries don't loose them. However, you get a lot more advanced ones that measure the temperature and freshness of the beer and log this data to a cloud system. Then people like us can use the app to find which of the bars closest to us are serving the beer we like.

I was thinking about these real world examples, and I decided that it was time we had something like this in SA as well. The problem is, none of the online stores here have open or public APIs that I could use. So I made this button instead. So if we take a look at this website over here, you can see this is my cart on the beyerskloof website. now if I click this button, and everything works... let's just check the logs... and refresh this page... Yes, every time I push this button a bottle of Beyerskloof synergy gets added to my cart.

And on that great note, thank you for listening to me, lets go drink some wine, I mean, are there any questions?