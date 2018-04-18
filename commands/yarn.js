module.exports = {
	command: 'yarn',
	aliases: [],
	category: 'Fun',
	description: 'Get a short gif of a movie quote!',
	usage: 'yarn <Quote to search for>',
	execute: (bot, user, userID, channelID, args, event) => {
        bot.sendMessage({
            to:channelID,
            message: 'Still in testing!'
        })
	}
};