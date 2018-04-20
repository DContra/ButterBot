var embed = require('../styling/gif_embed.json');

var sfw = [
	'https://media.giphy.com/media/MjcUR7bHAVHgs/giphy.gif',
	'https://media.giphy.com/media/Y40wzs3h2MbiU/giphy.gif',
	'https://media0.giphy.com/media/2g3OncDkX56JW/giphy.gif'
]
var nsfw = [
	'https://m.popkey.co/eb36ff/K9o50.gif',
	'https://media.giphy.com/media/l0HlwdSAQwCRpz3Yk/giphy.gif'
]


module.exports = {
	command: 'meatspin',
	aliases: ['ms'],
	category: 'NSFW',
	description: 'Just Find Out',
	usage: 'meatspin',
	execute: (bot, user, userID, channelID, args, event) => {
		if(bot.channels[channelID].nsfw || bot.channels[channelID].name.includes('nsfw')){
			bot.sendMessage({
				to: channelID,
				embed: {
					title: 'Meatspin',
					color: embed.color,
					image: {
						url: nsfw[Math.floor(Math.random() * nsfw.length)]
					}
				}
			})
		}
		else{
			bot.sendMessage({
				to: channelID,
				embed: {
					title: 'Meatspin',
					color: embed.color,
					image: {
						url: sfw[Math.floor(Math.random() * sfw.length)]
					}
				}
			})
		}
	}
};