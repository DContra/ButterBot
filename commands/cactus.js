var cacti = [
    'https://media.giphy.com/media/3oEduItbzfD1Xmqhwc/giphy.gif',
    'https://media.giphy.com/media/l0HlHgiDgsW2c32p2/giphy.gif',
    'https://media.giphy.com/media/wS8OH0T4GKHIY/giphy.gif',
	'https://media.giphy.com/media/l0IyebXezC6jXbyoM/giphy.gif',
	'https://cdn.discordapp.com/attachments/439081106382520341/448178321591762944/tumblr_o8ofmbbZx41ufu9cno1_1280.gif'
]

var embed = require('../styling/gif_embed.json');

module.exports = {
	command: 'cactus',
	aliases: [],
	category: 'Fun',
	description: 'Surprise! Cactus!',
	usage: 'cactus',
	execute: (bot, user, userID, channelID, args, event) => {
		if(args[0] == undefined || args[0] == NaN){
			bot.sendMessage({
				to: channelID,
				embed:{
					title: 'cactus',
					color: embed.color,
					image:{
						url: cacti[Math.floor(Math.random() * cacti.length)]
					}
				}
			})
		}
		else if(args[0] > cacti.length){
			bot.sendMessage({
				to:channelID,
				message: 'Please select a gif from the range 1 - '+cacti.length
			})
		}
		else{
			bot.sendMessage({
				to: channelID,
				embed:{
					title: 'cactus',
					color: embed.color,
					image:{
						url: cacti[args[0]-1]
					}
				}
			})
		}
	}
};