var Discord = require('discord.io');

module.exports = {
	command: 'timeout',
	aliases: [],
	category: 'Fun',
	description: 'Times User out for a certain amount of time. Prevents them from typing in chat',
	usage: 'timeout <user> <length of time in seconds> (Must be an @ tag)',
	execute: (bot, user, userID, channelID, args, event) => {
        if(event.d.mentions[0] == undefined){
            bot.sendMessage({
                to:channelID,
                message: 'Please specify a user!'
            })
            return
        }

        if(args[1] == undefined || args[1]%1 == NaN){
            bot.sendMessage({
                to:channelID,
                message: 'Please provide a valid length of time!'
            })
            return
        }
        
        var ID = event.d.mentions[0].id;
        var serverID = bot.channels[channelID].guild_id
        var roles = bot.servers[serverID].roles

        var exists = false;

        for(var role in roles){
            if(roles[role].name == 'timeout'){
                exists = true;
                var roleID = role
            }
        }

        if(!exists){
            bot.createRole(serverID, (err, res)=>{
                if(err) throw err
                bot.editRole({
                    serverID: serverID,
                    roleID: res.id,
                    name: 'timeout',
                    permissions:{
                        TEXT_SEND_MESSAGES: false
                    }
                }, (err, res) => {
                    if(err) throw err
                    for(var channel in bot.servers[bot.channels[channelID].guild_id].channels){
                        if(bot.channels[channel].type == 0){
                            //Is a text channel
                            bot.editChannelPermissions({
                                channelID: channel,
                                roleID: res.id,
                                deny: [Discord.Permissions.TEXT_SEND_MESSAGES]
                            });
                        }
                    }
                    Timeout(bot, serverID, res.id, ID, args)
                })
            })
        }

        else Timeout(bot, serverID, roleID, ID, args)
	}
};

function Timeout(bot, serverID, roleID, ID, args){
    bot.addToRole({
        serverID: serverID,
        userID: ID,
        roleID: roleID
    }, (err, res)=>{
        if (err) throw err
        setTimeout(()=>{
            bot.removeFromRole({
                serverID: serverID,
                userID: ID,
                roleID: roleID
            }, (err, res)=>{
                if(err) throw err
            })
        }, args[1] * 1000)
    })
}