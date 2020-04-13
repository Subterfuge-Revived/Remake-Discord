exports.run = (client, message, args) =>{
    if(args.length < 1){
        message.channel.send("Add a command to reload.");
        return;
    } 
    if(!client.commands.has(args[0])){
        message.channel.send("This command does not exist.");
        return;
    }
    //Clear out the require cache using the delete keyword
    delete require.cache[require.resolve("./"+args[0]+".js")];
    //remove it from the client.commands Map() object
    client.commands.delete(args[0]);
    
    //Put it back in
    const cache = require('./'+args[0]+".js");
    client.commands.set(args[0], cache);
    message.channel.send("The command "+args[0]+" has been reloaded successfully.");
  
}