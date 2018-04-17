const coin = [
    'heads',
    'tails'
]

module.exports = {
	command: 'flip',
	aliases: ['flipcoin', 'coin', 'flip-coin'],
	category: 'Fun',
	description: 'Flip a coin! Try it out!',
	usage: 'flip',
	execute: (bot, user, userID, channelID, args, event) => {
        bot.sendMessage({
            to: channelID,
            message: ':cd: │ ' + coin[Math.floor(Math.random() * coin.length)]
        });
	}
};