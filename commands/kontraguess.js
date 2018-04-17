const responses = [
    'Uhhh...',
    'Dude.. I dont fucking know...',
    'I mean... Maybe?',
    'Who cares?',
    'Please leave me alone..',
    'Fo sho',
    'Probably',
    'Ask 8ball',
    'Really? you gonna waste everyones time with this?',
    'Have you even tried googling this for yourself..?',
    'Whatever man... sure... just please fuck off...'
];

module.exports = {
	command: 'kontraguess',
	aliases: ['kguess', 'kg', 'kontra-guess'],
	category: 'Fun',
	description: 'Have Kontra Guess the answer to your question!',
	usage: 'kontraguess <question>',
	execute: (bot, user, userID, channelID, args, event) => {
        if (args.length < 1){
            bot.sendMessage({
                to: channelID,
                message: 'You forgot to ask a question you dumb fuck'
            });
        }
        else{
            bot.sendMessage({
                to: channelID,
                message: ':unamused: │ ' + responses[Math.floor(Math.random() * responses.length)]
            });
        }
	}
};