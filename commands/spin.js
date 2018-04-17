module.exports = {
	command: 'spin',
	aliases: ['roulette'],
	category: 'Fun',
	description: 'Spins a 6 shooter pistol. Feeling lucky?',
	usage: 'spin',
	execute: (bot, user, userID, channelID, args, event) => {
        bot.sendMessage({
            to:channelID,
            message: Math.floor(Math.random() * 6) == 3 ? ':gun: You\'re dead <@!'+userID+'>' : ':stuck_out_tongue_winking_eye: You\'re safe <@!'+userID+'>'
        })
	}
};