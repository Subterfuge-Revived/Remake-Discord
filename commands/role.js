exports.run = (client, message, args) => {
    switch (args[0]) {
        case "give":
            if (message.mentions.roles.array().length === 1 && message.mentions.members.array().length === 1) {
                //mentions.members.first().addRole(mentions.roles.first());
                message.mentions.members.first().roles.add(message.mentions.roles.first()).catch((e) => {
                    switch (e.code) {
                        case 50013:
                            message.channel.send(message.guild.me.displayName + " doesn't seem to have the right permissions.  Check if you have a higher role, or gave it the right permissions.");
                            break;
                        default:
                            message.channel.send("Something went wrong. Try checking out error code " + e.code);
                            break;
                    }
                }).then(() => {
                    message.channel.send("Gave " + message.mentions.members.first().toString() + " the role " + message.mentions.roles.first().toString() + ".");
                });
            } else {
                message.channel.send("Error, check your formatting.");
            }
            break;
        case "take":
            if (message.mentions.roles.array().length === 1 && message.mentions.members.array().length === 1) {
                message.mentions.members.first().roles.remove(message.mentions.roles.first())
                    .then((user) => {
                        message.channel.send("Took "+message.mentions.roles.first().toString()+" from "+message.mentions.members.first().toString());
                    })
                    .catch((e) => {
                        switch (e.code) {
                            case 50013:
                                message.channel.send(message.guild.me.displayName + " doesn't seem to have the right permissions.  Check if you have a higher role, or gave it the right permissions.");
                                break;
                            default:
                                console.log(e)
                                message.channel.send("Something went wrong. Try checking out error code " + e.code);
                                break;
                        }
                    })
            } else {
                message.channel.send("Error, check your formatting.");
            }
            break;
        default:
            message.channel.send("default from switch case, set up with role help embed later.")
    }
}