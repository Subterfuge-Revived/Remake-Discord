exports.run = (client, message, args)=>{
	var response = args.join();
	message.channel.send(response);
};