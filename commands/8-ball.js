const responses = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes, definetly',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
	'Reply hazy try again',
	'Ask again later',
	'Better not tell you now',
	'Cannot predict now',
	'Concentrate and ask again',
	'Don\'t count on it',
	'My reply is no',
	'My sources say no',
	'Outlook not so good',
	'Very doubtful'
];

module.exports = {
	command: '8ball',
	aliases: [
		'8-ball'
	],
	category: 'Fun',
	description: 'Get an accurate response from the magic 8-ball.',
	usage: '8ball <question>',
	execute: (bot, user, userID, channelID, args, event) => {
		if (args.length < 1){
            bot.sendMessage({
                to: channelID,
                message: 'You forgot to ask a question!'
            });
        }
        else{
            bot.sendMessage({
                to: channelID,
                message: ':8ball: │ ' + responses[Math.floor(Math.random() * responses.length)]
            });
        }
	}
};