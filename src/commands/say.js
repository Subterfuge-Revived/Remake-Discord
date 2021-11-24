module.exports = {
	name: "say",
	description: "Repeats what you said",
	options: [
		{
			type: 3, // 3 is a STRING
			name: "sentence",
			description: "What to repeat back",
			required: true,
		}
	],
	execute(client, interaction) {
		interaction.editReply(interaction.options.getString("sentence"));
	}
};
