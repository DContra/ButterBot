var request = require('request');
var embed = require('../styling/gif_embed.json')
var auth = require('../auth.json')

module.exports = {
	command: 'mock',
	aliases: [],
	category: 'Fun',
	description: 'Change text to the form of the Spongebob Meme.',
	usage: 'mock <text> || if no text is given, will mock last message in channel',
	execute: (bot, user, userID, channelID, args, event) => {
		if(auth.imgflip == undefined || auth.imgflip.user == undefined || auth.imgflip.pass == undefined){
			bot.sendMessage({
				to: channelID,
				message: 'Imgflip api is not configured yet! please ask the manager of this bot to configure it!'
			})
			return
		}


		bot.getMessages({
			channelID: channelID,
			limit: 2
		}, (err, res) => {
			
			var formData = {
				template_id : "102156234",
				username : auth.imgflip.user,
				password : auth.imgflip.pass,
				boxes: [
					{
						text: args[0] != undefined ? mock(args.join(' ')) : mock(res[1].content),
						x: 10,
						y: 225,
						width: 492,
						height: 100
					}
				]
			};
			 
			request.post("https://api.imgflip.com/caption_image", {
				form : formData
			}, function(error, response, body) {
			 
				var meme = JSON.parse(body);
			 
				if (!error && response.statusCode == 200) {
					bot.sendMessage({
						to: channelID,
						embed:{
							color:embed.color,
							image:{
								url: meme.data.url
							}
						}
					}, () => {
						bot.deleteMessage({
							channelID: channelID,
							messageID: res[0].id
						})
					})
				}
			 
			});
		})
	}
};

function mock(str) {
	var base = 2;
	var lastUp = 0;
	var lastDown = 0;

	str = str.split('');
	for (var i = 0; i < str.length; i++) {
		let ran = Math.floor(Math.random() * 100);
		if (str[i] != ' ') {
			if ((ran % base == 0 || i - lastUp > base) && i - lastDown < base) {
				str[i] = str[i].toUpperCase();
				lastUp = i;
			} else if (i - lastDown > base) {
				str[i] = str[i].toLowerCase();
				lastDown = i;
			} else {
				str[i] = str[i].toLowerCase();
				lastDown = i;
			}
		}
	}
	return str.join('')
}