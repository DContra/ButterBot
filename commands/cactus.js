var cacti = [
    'https://media.giphy.com/media/3oEduItbzfD1Xmqhwc/giphy.gif',
    'https://media.giphy.com/media/l0HlHgiDgsW2c32p2/giphy.gif',
    'https://media.giphy.com/media/wS8OH0T4GKHIY/giphy.gif',
    'https://media.giphy.com/media/l0IyebXezC6jXbyoM/giphy.gif'
]

var embed = require('../styling/gif_embed.json');

module.exports = {
	command: 'cactus',
	aliases: [],
	category: 'Fun',
	description: 'Surprise! Cactus!',
	usage: 'cactus',
	execute: (bot, user, userID, channelID, args, event) => {
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
};