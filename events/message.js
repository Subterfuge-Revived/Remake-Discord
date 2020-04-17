module.exports = (client, message) => {
    if (message.author.bot) return;
    //If the prefix isn't the first thing, then ignore.  also bots ^
    if (message.content.indexOf(client.prefix) !== 0) return;
    //Split up the message. Typically commands come in the form prefix command arg1 arg2 arg3 ...
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    //check argument syntax
    if (cmd.args && !cmd.args(client,message,args)){
        message.channel.send("Incorrect Usage. Try "+client.prefix+cmd.help.usage)
        return;
    } 
    //check permissions
    if (cmd.permissions && !cmd.permissions(client, message, args)){
        message.channel.send("You lack the permissions for this role.");
        return;
    }
    cmd.run(client, message, args);

}