module.exports = {
	name: "ping",
	description: "Replies with pong",
	execute(client, interaction) {
		// used to get latency from client to bot
		var now = Date.now();
		interaction.editReply(`Pong! ${now - interaction.createdAt} ms`);
	}
};