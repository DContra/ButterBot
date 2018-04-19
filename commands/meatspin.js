var sfw = [
	'https://giphy.com/gifs/MjcUR7bHAVHgs',
	'https://giphy.com/gifs/Y40wzs3h2MbiU',
	'https://giphy.com/gifs/meatspin-2g3OncDkX56JW'
]
var nsfw = [
	'https://m.popkey.co/eb36ff/K9o50.gif'
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
				message: nsfw[Math.floor(Math.random() * nsfw.length)]
			})
		}
		else{
			bot.sendMessage({
				to: channelID,
				message: sfw[Math.floor(Math.random() * sfw.length)]
			})
		}
	}
};