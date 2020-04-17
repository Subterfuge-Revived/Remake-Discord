exports.run = (client, message, args) => {
    if (args.length === 0) {
        message.channel.send("Current prefix is `"+client.prefix+"`");
    } else {
        if(args[0].length > 2){
            message.channel.send("Prefix must be no more than 2 characters.")
            return;
        }
        const fs = require('fs');
        var jsonData = JSON.parse(fs.readFileSync('./config.json'));
        jsonData.prefix = args[0];
        fs.writeFileSync('./config.json',JSON.stringify(jsonData))
        client.prefix = JSON.parse(fs.readFileSync('./config.json')).prefix;
        client.user.setActivity(`${client.prefix}help`, {type: "LISTENING"});
        message.channel.send("Prefix changed to `"+client.prefix+'`')
    }

}
exports.permissions = (client, message, args) => {
    //Function to determine if user has rights to use this command.
    return message.member.hasPermission(["ADMINISTRATOR"]) || message.member.roles.cache.find(role => role.id === client.staffRole)
}
exports.args = (client, message, args) => {
    return args.length < 2;
}
exports.help = {
    name: "prefix",
    description: "Change the bot's command prefix.",
    usage: "prefix [new_prefix]"
}