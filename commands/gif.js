var https = require('https');
var auth = require('../auth.json');
var embed = require('../styling/gif_embed.json');

module.exports = {
	command: 'gif',
	aliases: ['giph', 'giphy'],
	category: 'Fun',
	description: 'Get a gif from giphy!',
	usage: 'gif <search terms>',
	execute: (bot, user, userID, channelID, args, event) => {
        if(auth.giphy_key == undefined){
            bot.sendMessage({
                to: channelID,
                message: 'Gif is not configured yet! Please contact whoever is in charge of managing me to have them configure gifs!'
            })
            return;
        }
        let data = '';

        var options = {
            hostname: 'api.giphy.com',
            port: 443,
            Method: 'GET',
            path: `/v1/gifs/search?api_key=${auth.giphy_key}&q=${escape(args.join(' '))}&limit=1&offset=0&rating=R&lang=en`
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
                            name: 'Giphy - ' + args.join(' '),
                            icon_url: 'http://78.media.tumblr.com/b508813ce2f04b27f1a6597ded1de623/tumblr_mrsdao4gWV1s5e5bko1_500.gif'
                        },
                        description: `[Click here to view in browser](${data.data[0].url})`,
                        color: embed.color,
                        image: {
                            url: data.data[0].images.original.url
                        }
                    }
                })
            })
        })
	}
};