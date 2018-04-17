module.exports = {
	command: 'meatspin',
	aliases: ['ms'],
	category: 'NSFW',
	description: 'Just Find Out',
	usage: 'meatspin',
	execute: (bot, user, userID, channelID, args, event) => {
        console.log('hey there neighbor')
        bot.sendMessage({
            to: channelID,
            message: 'https://giphy.com/gifs/MjcUR7bHAVHgs'
        })
	}
};