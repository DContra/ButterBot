module.exports = {
	command: 'invite',
	aliases: [],
	category: 'Fun',
	description: 'Get my invite link to add me to your server!',
	usage: 'invite',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.sendMessage({
            to: channelID,
            message: 'Invite me to your server!\n'+bot.inviteURL
        });
	}
};