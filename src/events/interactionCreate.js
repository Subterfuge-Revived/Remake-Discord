module.exports = async (client, interaction) => {
	// If not a command, quit
	if(!interaction.isCommand()) return;
	// Used to make the bot say "thinking"
	await interaction.deferReply(); // Idk if await is necesary
	// Get command
	const cmd = client.commands.find(command => command.name === interaction.commandName);
	// Run it
	cmd.execute(client, interaction);
};