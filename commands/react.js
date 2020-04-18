exports.run = (client, message, args) => {
    const fs = require('fs');
    const mapToObj = m => {
        return Array.from(m).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };
    switch (args[0]) {
        case "create":
            var reactionPairs = new Map();
            if (args.length > 3) {
                for (var i = 3; i < args.length; i += 2) {
                    reactionPairs.set(args[i], args[i + 1].slice(3, -1));
                }
            } else {
                message.channel.send("You may have gotten the arguments wrong");
                break;
            }
            for (var i = 3; i < args.length; i += 2) {
                if (args[i].length > 1) {
                    message.channel.send("That is not a supported emoji.")
                        .then((msg) => {
                            msg.delete({ "timeout": 3000 });
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            }
            if (message.mentions.roles.array().length < args.length - 3) {
                message.channel.send("You may have gotten the arguments wrong");
                break;
            }
            try {
                client.channels.fetch(message.mentions.channels.first().id)
                    .then((channel) => {
                        channel.messages.fetch(args[2])
                            .then((msg) => {
                                if (client.collectors.has(msg.id)) {
                                    client.collectors.get(msg.id).stop()
                                }
                                fs.promises.writeFile('./reactMessages/' + msg.channel.id + "-" + msg.id + '.json', JSON.stringify(mapToObj(reactionPairs)))
                                    .then(() => {
                                        console.log("success writing file, initiating collector without end");
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                                console.log("reacting");
                                for (var i = 3; i < args.length; i += 2) {
                                    msg.react(args[i])
                                }
                                client.collectors.set(msg.id, msg.createReactionCollector((reaction, user) => reactionPairs.has(reaction.emoji.name) && !user.bot, { 'dispose': true }))
                                client.collectors.get(msg.id).on('collect', (r, u) => {
                                    msg.channel.send(`assigning ${r.emoji},`)
                                        .then((msg) => {
                                            msg.delete({ "timeout": 3000 });
                                            msg.guild.roles.fetch(reactionPairs.get(r.emoji.name))
                                                .then((role) => {
                                                    member = message.guild.members.cache.find(member => member.id === u.id)
                                                    member.roles.add(role)
                                                        .then((member) => {
                                                            console.log("Success adding role")
                                                        })
                                                        .catch((e) => {
                                                            console.log(e)
                                                        })
                                                })
                                                .catch((e) => {
                                                    console.log(e);
                                                })
                                        })
                                        .catch((e) => {
                                            console.log(e)
                                        })
                                })
                                client.collectors.get(msg.id).on('remove', (r, u) => {
                                    msg.channel.send(`removing ${r.emoji}.`)
                                        .then((msg) => {
                                            msg.delete({ "timeout": 3000 });
                                            msg.guild.roles.fetch(reactionPairs.get(r.emoji.name))
                                                .then((role) => {
                                                    member = message.guild.members.cache.find(member => member.id === u.id)
                                                    member.roles.remove(role)
                                                        .then((member) => {

                                                        })
                                                        .catch((e) => {
                                                            console.log(e)
                                                            message.channel.send("Something went wrong giving you a role.")
                                                            return;
                                                        })
                                                })
                                        })
                                })
                            })
                            .catch((e) => {
                                console.log(e);
                                message.channel.send("This message might not exist.")
                                return;
                            })
                    })
                    .catch((e) => {
                        console.log(e);
                        message.channel.send("Does this channel exist?");
                        return;
                    })
            } catch (e) {
                console.log(e)
            }
            break;
        case "add":
            message.channel.send("Not yet implemented.");
            break;
        case "list":
            console.log("List");
            var keys = "";

            for (const [key, value] of client.collectors) {
                console.log(key)
                const test = value;
                var temp = ""
                for (const [key, value] of test.roles) {
                    console.log(key, value)
                    temp += key + " " + value + "\n";
                }
                keys += key + ": " + temp + "\n";
            }

            message.channel.send("Active Reaction Messages:" + '\n' + keys)
                .then((msg) => {
                    //msg.delete({ "timeout": 3000 })
                })
                .catch((e) => {
                    console.log(e)
                })

            break;
        default:
            message.channel.send("Help message to be added.");
            break;
    }
    // message.delete({ "timeout": 3500 })
    //     .then(() => {
    //         console.log("success with final deletion");
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })
}
exports.init = (client) => {
    const fs = require('fs');
    fs.readdir('./reactMessages/', (error, files) => {
        console.log("Initializing Reaction Roles")
        if (error) {
            return console.log(error);
        }
        files.forEach(file => {
            if (!file.endsWith(".json")) {
                return;
            }
            console.log("loading file " + file);
            fs.readFile("./reactMessages/" + file, (error, data) => {
                if (error) {
                    console.log(error)
                    return;
                }
                const channelID = file.split('.')[0].split('-')[0];
                this.startCollector(client, file.split('.')[0].split('-')[0], file.split('.')[0].split('-')[1], new Map(Object.entries(JSON.parse(data.toString()))))


                // client.channels.fetch(channelID)
                //     .then((channel) => {
                //         const messageID = file.split('.')[0].split('-')[1];
                //         channel.messages.fetch(messageID)
                //             .then((msg) => {
                //                 var reactionPairs = new Map(Object.entries(JSON.parse(data.toString())))
                //                 client.collectors.set(msg.id, msg.createReactionCollector((reaction, user) => reactionPairs.has(reaction.emoji.name) && !user.bot, { 'dispose': true }))
                //                 client.collectors.get(msg.id).roles = reactionPairs;
                //                 client.collectors.get(msg.id).on('collect', (r, u) => {
                //                     msg.channel.send(`assigning ${r.emoji}`)
                //                         .then((msg) => {
                //                             msg.delete({ "timeout": 3000 });

                //                             msg.guild.roles.fetch(reactionPairs.get(r.emoji.name))
                //                                 .then((role) => {
                //                                     member = channel.guild.members.cache.find(member => member.id === u.id)
                //                                     member.roles.add(role);
                //                                 })
                //                                 .catch((e) => {
                //                                     console.log(e);
                //                                 })
                //                         })
                //                         .catch((e) => {
                //                             console.log(e)
                //                         })
                //                 })
                //                 client.collectors.get(msg.id).on('remove', (r, u) => {
                //                     msg.channel.send(`removing ${r.emoji}.`)
                //                         .then((msg) => {
                //                             msg.delete({ "timeout": 3000 });
                //                             msg.guild.roles.fetch(reactionPairs.get(r.emoji.name))
                //                                 .then((role) => {
                //                                     member = msg.guild.members.cache.find(member => member.id === u.id)
                //                                     member.roles.remove(role)
                //                                         .then((member) => {
                //                                             console.log("Success removing role")
                //                                         })
                //                                         .catch((e) => {
                //                                             console.log(e)
                //                                         })
                //                                 })
                //                                 .catch((e) => {
                //                                     console.log("Role does not exist")
                //                                     console.log(e);
                //                                 })
                //                         })
                //                         .catch((e) => {
                //                             console.log(e);
                //                         })
                //                 })
                //             })
                //             .catch((e) => {
                //                 console.log("Message may not exist anymore")
                //                 console.log(e)
                //             })
                //     })
                //     .catch((e) => {
                //         console.log("Channel may not exist");
                //         console.log(e);
                //     })
            })
        })
    })
}
exports.permissions = (client, message, args) => {
    return message.member.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS']) || message.member.roles.cache.has("")
}
exports.stop = (client) => {
    for (const [key, value] of client.collectors) {
        value.stop();
    }
}
exports.startCollector = (client, channel_id_to_react_to, message_id_to_react_to, reaction_map) => {
    //Stop the existing reaction role
    if (client.collectors.has(message_id_to_react_to)) client.collectors.get(message_id_to_react_to).stop();
    client.channels.fetch(channel_id_to_react_to)
        .then((channel) => {
            channel.messages.fetch(message_id_to_react_to)
                .then((msg) => {
                    client.collectors.set(msg.id, msg.createReactionCollector((reaction, user)=>{
                        return reaction_map.has(reaction.emoji.name) && !user.bot
                    }, { 'dispose': true }))
                    client.collectors.get(msg.id).roles = reaction_map;
                    client.collectors.get(msg.id).on('collect', (r, u) => {
                        this.role(channel, u, reaction_map.get(r.emoji.name), true)
                    })
                    client.collectors.get(msg.id).on('remove', (r, u) => {
                        this.role(channel, u, reaction_map.get(r.emoji.name), false)
                    })
                })
        })
}
exports.role = (channel, user, roleID, give) => {
    channel.guild.roles.fetch(roleID)
        .then((role) => {
            channel.guild.members.fetch(user.id)
                .then((member) => {
                    if (give) {
                        member.roles.add(role)
                            .then(() => {
                                channel.send("Assigned role " + role.toString() + ".")
                                    .then((msg) => {
                                        msg.delete({ "timeout": 1000 })
                                    })
                            })
                            .catch((e) => {
                                //Failed to assign role
                                channel.send("Something went wrong")
                                    .then((msg) => {
                                        msg.delete({ "timeout": 1000 })
                                    })
                            })
                    }
                    else {
                        member.roles.remove(role)
                            .then(() => {
                                channel.send("Removed role " + role.toString() + ".")
                                    .then((msg) => {
                                        msg.delete({ "timeout": 1000 })
                                    })
                            })
                            .catch((e) => {
                                //Failed to assign role
                                channel.send("Something went wrong")
                                    .then((msg) => {
                                        msg.delete({ "timeout": 1000 })
                                    })
                            })
                    }
                })
                .catch((e) => {
                    //No member????? not sure how this could happen.
                    console.log(e);
                })
        })
        .catch((e) => {
            console.log(e);
            channel.send("Could not find specified role")
                .then((msg) => {
                    msg.delete({ "timeout": 1000 })
                })
        })
}

exports.help = {
    name: "react",
    description: "A reaction role enabler",
    usage: "react add|create|list <#channel> <MessageID> <emoji> <@role> ..."
}
exports.args = (client, message, args) => {
    if (args[0] === "create") {
        if (args.length < 5) return false;
        if (args.length % 2 == 0) return false; //Expect pairs of reaction and then role    
    }
    if (args[0] === "list") {
        return true;
    }
    if (args[0] === "add") {
        return true;
    }
}