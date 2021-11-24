module.exports = {
	name: "ping",
	description: "Replies with pong",
	execute(client, interaction) {
		interaction.editReply("Pong!");
	}
};