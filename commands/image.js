var https = require('https');
var auth = require('../auth.json');
var embed = require('../styling/gif_embed.json');

module.exports = {
	command: 'image',
	aliases: [],
	category: 'Fun',
	description: 'Get an image from google!',
	usage: 'image <search terms>',
	execute: (bot, user, userID, channelID, args, event) => {
        if(auth.google_api_key == undefined || auth.google_cse_id == undefined){
            bot.sendMessage({
                to: channelID,
                message: 'Image is not configured yet! Please contact whoever is in charge of managing me to have them configure images'
            })
            return;
        }
        let data = '';

        var options = {
            hostname: 'www.googleapis.com',
            port: 443,
            Method: 'GET',
            path: `/customsearch/v1?q=${escape(args.join(' '))}&cx=${auth.google_cse_id}&key=${auth.google_api_key}&num=1&searchType=image`
        }

        https.get(options, (res)=>{
            res.setEncoding("utf8");

            res.on('data', d=>{
                data += d;
            })

            res.on('end', ()=>{
                data = JSON.parse(data);
                bot.sendMessage({
                    to: channelID,
                    embed:{
                        author:{
                            name: 'Google - ' + args.join(' ')
                        },
                        color: embed.color,
                        image: {
                            url: data.items[0].image.thumbnailLink
                        }
                    }
                })
            })
        })
	}
};