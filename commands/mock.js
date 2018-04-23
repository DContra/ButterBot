module.exports = {
	command: 'mock',
	aliases: [],
	category: 'Fun',
	description: 'Change text to the form of the Spongebob Meme.',
	usage: 'mock <text> || if no text is given, will mock last message in channel',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.getMessages({
			channelID: channelID,
			limit: 2
		}, (err, res)=>{

				bot.sendMessage({
					to: channelID,
					message: args[0] != undefined ? memeify(args.join(' ')):memeify(res[1].content)
				}, ()=>{
					bot.deleteMessage({
						channelID: channelID,
						messageID: res[0].id
					})
				})
			})
	}
};

function memeify(str, base = 3){
	str = str.split('').map(function(x){
		ran = Math.floor(Math.random()*100);
		if(ran % base == 0){
			return x.toUpperCase();
		}
		else{
			return x.toLowerCase();
			}
	}).join('');
	return str;
}