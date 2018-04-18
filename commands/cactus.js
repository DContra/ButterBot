var cacti = [
    'https://giphy.com/gifs/house-cactus-allison-3oEduItbzfD1Xmqhwc',
    'https://giphy.com/gifs/animation-happy-l0HlHgiDgsW2c32p2',
    'https://giphy.com/gifs/wS8OH0T4GKHIY',
    'https://giphy.com/gifs/animation-art-food-l0IyebXezC6jXbyoM'
]

module.exports = {
	command: 'cactus',
	aliases: [],
	category: 'Fun',
	description: 'Surprise! Cactus!',
	usage: 'cactus',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.sendMessage({
			to: channelID,
			message: cacti[Math.floor(Math.random() * cacti.length)]
		})
	}
};