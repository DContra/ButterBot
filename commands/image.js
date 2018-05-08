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
        if(auth.google.api_key == undefined || auth.google.cse_id == undefined){
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
            path: `/customsearch/v1?q=${escape(args.join(' '))}&cx=${auth.google.cse_id}&key=${auth.google.api_key}&num=1&searchType=image`
        }
        
        if(!bot.channels[channelID].nsfw && !bot.channels[channelID].name.includes('nsfw')) options.path+='&safe=high';

        https.get(options, (res)=>{
            res.setEncoding("utf8");

            res.on('data', d=>{
                data += d;
            })

            res.on('end', ()=>{
                data = JSON.parse(data);
                if(data.items == undefined){
                    bot.sendMessage({
                        to: channelID,
                        message: 'No image results found for \"' + args.join(' ') + '\"'
                    })
                    return;
                }
                bot.sendMessage({
                    to: channelID,
                    embed:{
                        author:{
                            name: 'Google - ' + args.join(' ')
                        },
                        color: embed.color,
                        image: {
                            url: data.items[0].link
                        }
                    }
                })
            })
        })
	}
};