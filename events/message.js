module.exports = (client, message) => {
    if(message.author.bot) return;
    //If the prefix isn't the first thing, then ignore.  also bots ^
    if(message.content.indexOf(client.prefix)!==0) return; 
    //Split up the message. Typically commands come in the form prefix command arg1 arg2 arg3 ...
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if(!cmd) return;
    cmd.run(client,message,args);
}