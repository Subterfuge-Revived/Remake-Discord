exports.run = async(client, message, args) => { //Override the default args with the client arg from earlier.
    // message.channel.send("pong!").catch(console.error);
    const msg = await message.channel.send("Ping");
    msg.edit(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.`)
}
exports.args = (client,message, args)=>{
    return true;
}
exports.help = {
    name: "ping",
    description: "Tests bot response time in milliseconds.",
    usage: "ping"
}
exports.permissions = (client, message, args)=>{
    return true;
}