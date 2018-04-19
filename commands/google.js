module.exports = {
	command: 'google',
	aliases: ['g'],
	category: 'Fun',
	description: 'Get a google search link to your query',
	usage: 'g <search query>',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.sendMessage({
            to: channelID,
            embed: {
                title: 'Search Google for '+args.join(' '),
                url: 'https://www.google.com/search?q=' + args.join('+')
            }
        });
	}
};