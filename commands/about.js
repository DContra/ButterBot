var embed = require('../styling/gif_embed.json')
var info = require('../package-lock.json');

module.exports = {
	command: 'about',
	aliases: [],
	category: 'Info',
	description: 'About this bot',
	usage: 'about',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.sendMessage({
            to: channelID,
            embed: {
                title: 'About me!',
                color: embed.color,
                description: 'Hey there! I\'m Butter Bot! I was developed by Daniel \'Kontra\' Contreras! For a list of my commands, just type `.commands`!',
                fields: [
                    {
                        name: 'Version',
                        value: info.version
                    }
                ]
            }
        });
	}
};