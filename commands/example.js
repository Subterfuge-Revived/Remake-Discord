exports.run = (client,message,args)=>{
    //What you'd do in the command
    message.channel.send("An example command for formatting");
}
exports.init = (client)=>{
    //Run upon loading the command
    return;
}
exports.permissions = (client, message,args)=>{
    //Function to determine if user has rights to use this command.
    //Try return message.member.hasPermission(["MANAGE_CHANNELS"])
    return true;
}
exports.args = (client, message, args)=>{
    //Check to make sure argument syntax works.
    //return args.length > 1
    return true;
}
exports.help = {
    name: "example",
    description: "A simple example for creating your own commands",
    usage: "example"
}