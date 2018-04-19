const rp = require('request-promise');
const cheerio = require('cheerio');
var embed = require('../styling/gif_embed.json');

module.exports = {
	command: 'yarn',
	aliases: [],
	category: 'Fun',
	description: 'Get a short gif of a movie quote!',
	usage: 'yarn <Quote to search for>',
	execute: (bot, user, userID, channelID, args, event) => {
		let results = [];
		const options = {
			uri: `https://getyarn.io/yarn-find?text=${escape(args.join(' '))}`,
			transform: function (body) {
				return cheerio.load(body);
			}
		};
		rp(options)
			.then(($) => {
				$('a').each(function (i, elem) {
					if ($(elem)['0'].attribs.href.startsWith('/yarn-clip/')) {
						results.push($(elem)['0'].attribs.href.substr(11, $(elem)['0'].attribs.href.length))
					}
				});
				if (results.length != 0) {
					bot.sendMessage({
						to: channelID,
						embed: {
							title: `Yarn results for "${args.join(' ')}"`,
							color: embed.color,
							image: {
								url: 'https://y.yarn.co/' + results[0] + '_text_hi.gif'
							}
						}
					});
				} else {
					bot.sendMessage({
						to: channelID,
						embed: {
							description: `No yarn results found for "${args.join(' ')}" <@!${userID}>`,
							color: embed.color
						}
					});
				}

			})
			.catch((err) => {
				console.log(err);
			});
	}
};