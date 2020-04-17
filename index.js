//Import required libraries and files
const { token } = require('./tokens.json');
const { prefix, mod } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client(/*{ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }*/);  // Turned off for now
//Add prefix to client, so importing the config json file isn't necessary every module.  For future, prefix command will need to differentiate between the original and cached versions. 
client.prefix = prefix;
client.collectors = new Map();

client.once('ready', () => {
    client.user.setActivity(`${client.prefix}help`, {type: "LISTENING"});
    console.log("Bot has connected successfully!");
    //Two main things: events and commands.  Essentially on the 
    //events, it will listen to the event, then if the event 
    //triggers a command, the command will be run.  
    console.log("Loading events")
    fs.readdir('./events/', (error, files) => {
        if (error) {
            return console.log(error);
        }
        files.forEach(file => {
            if (!file.endsWith(".js")) return; //I kinda wish I didn't develop on Mac
            console.log("loading " + file);
            const event = require("./events/" + file);
            var eventName = file.split(".")[0]; // blank.js -> blank
            //Whenever the event would be called, it stops the event, then calls the correct event handler, feeding it the client too.
            client.on(eventName, event.bind(null, client));

            //Clear the cached version of it after it's been tied to the event. ty stack overflow
            delete require.cache[require.resolve("./events/" + file)] //Possibly unnecessary, but I think it makes it faster
        });
    });
    //Load command files from ./commands/ folder
    //To be refactored into a load function and an unload unload
    console.log("Loading commands")
    client.commands = new Map();
    fs.readdir('./commands/', (err, files) => {
        if (err) return console.log(err)
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            console.log("requiring " + file);
            const command = require('./commands/' + file);
            if (command.init) {
                command.init(client);
            }
            const name = file.split(".")[0];
            //Stuff into a map ***Debug point***

            client.commands.set(name, command);
        });
    })
});



client.login(token);

//Rewrite this into a separate file with other additional javascript loading commands to keep stuff clean later.
//When extracting to resource file, keep in mind this './' file path may need to change
function loadCommandFile(commandName) {
    try {
        const command = require("./commands/" + commandName + ".js");
        //are there any commands that could use an initialization? possibly like a live tracker or something
        client.commands.set(commandName, command)
    } catch (e) {
        console.log("tried to load " + commandName)
        console.log(e)
        return `Unable to load command ${commandName}: ${e}`;
    }
}

