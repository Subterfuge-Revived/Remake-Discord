exports.run = (client, message, args) => { //Override the default args with the client arg from earlier.
	message.channel.send("pong!").catch(console.error);
};