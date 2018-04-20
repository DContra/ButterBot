var https = require('https');
var embed = require('../styling/gif_embed.json')

module.exports = {
	command: 'dadjoke',
	aliases: ['dad-joke', 'dad', 'joke'],
	category: 'Fun',
	description: 'Tells a terrible joke.',
	usage: 'dadjoke',
	execute: (bot, user, userID, channelID, args, event) => {
        var data = '';
        var options = {
            hostname: 'icanhazdadjoke.com',
            port: 443,
            Method: 'GET',
            path: `/slack`
        }

        https.get(options, (res)=>{
            res.setEncoding('utf-8');

            res.on('data', d=>{
                data += d;
            })

            res.on('end', ()=>{
                data = JSON.parse(data);
                console.log(data)
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        description: `:rolling_eyes: <@!${userID}> | ${data.attachments[0].text}`,
                        color: embed.color
                    }
                });
            })
        })

	}
};