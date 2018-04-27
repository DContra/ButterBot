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
		let resultUrls = [];
		let result = {};
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
						resultUrls.push($(elem)['0'].attribs.href)
					}
				});
				if (resultUrls.length != 0) {

					options.uri = `https://getyarn.io${resultUrls[0]}`

					result.url = 'https://y.yarn.co/' + resultUrls[0].substr(11, resultUrls[0].length) + '_text_hi.gif';

					rp(options)
						.then(($) => {
							$('b').each(function (i, elem) {
								if (elem.attribs.itemprop != null && elem.attribs.itemprop == 'headline') {
									//This is the headline
									result.headline = elem.children[0].data;
								} else if (elem.attribs.itemprop != null && elem.attribs.itemprop == 'name') {
									//This is the name
									result.name == undefined ? result.name = elem.children[0].data : result.name += ' - ' + elem.children[0].data;
								}
							});
							bot.sendMessage({
								to:channelID,
								embed: {
									color: embed.color,
									title: result.headline,
									url: options.uri,
									description: result.name,
									image:{
										url: result.url
									}
								}
							})
						})
						.catch((err) => {
							console.log(err);
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