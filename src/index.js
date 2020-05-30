//Import required libraries and files
const { token } = require("./tokens.json");
const {prefix, mod} = require("./config.json");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
//Add prefix to client, so importing the config json file isn't necessary every time.  For future, prefix command will need to differentiate between the original and cached versions. 
client.prefix = prefix;

client.once("ready", () => {
	console.log("Bot has connected successfully!");
	// client.user.setAvatar("./resources/avatar.png").then(() => console.log("New avatar set!"));

	//Two main things: events and commands.  Essentially on the 
	//events, it will listen to the event, then if the event 
	//triggers a command, the command will be run.  
	console.log("Loading events");
	fs.readdir("./src/events/", (error, files) => {
		if (error) {
			return console.log(error);
		}
		files.forEach(file => {
			if (!file.endsWith(".js")) return; //I kinda wish I didn't develop on Mac
			console.log("loading "+file);
			const event = require("./events/"+file);
			var eventName = file.split(".")[0]; // blank.js -> blank
			//Whenever the event would be called, it stops the event, then calls the correct event handler, feeding it the client too.
			client.on(eventName, event.bind(null, client));

			//Clear the cached version of it after it's been tied to the event. ty stack overflow
			delete require.cache[require.resolve("./events/"+file)]; //Possibly unnecessary, but I think it makes it faster
		});
		console.log("Events loaded");
	});
	//Load command files from ./commands/ folder

	console.log("Loading commands");
	client.commands = new Map();
	fs.readdir("./src/commands/",(err, files)=>{
		if(err) return console.log(err);
		files.forEach(file => {
			if(!file.endsWith(".js")) return;
			console.log("requiring "+file);
			const command = require("./commands/"+file);
			const name = file.split(".")[0];
			//Stuff into a map ***Debug point***
            
			client.commands.set(name, command);
		});
		console.log("Commands loaded");
	});
});


client.login(token);

