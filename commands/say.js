exports.run = (client, message, args)=>{
    var response = args.join();
    message.channel.send(response);
}
exports.help = {
    name: "say",
    description: "Have the bot send a message.",
    usage: "say [content]"
}
exports.args = (client, message, args)=>{
    return args.length > 0;
}
exports.permissions = (client, message, args)=>{
    
}