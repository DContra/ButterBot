var request = require('request');

module.exports = {
    command: 'urban-random',
    aliases: ['urandom', 'random'],
    category: 'Fun',
    description: 'Get a random word from urban dictionary',
    usage: 'urban-random',
    execute: (bot, user, userID, channelID, args, event) => {
        var embed = require('../styling/urban_embed.json');

        request.get('http://api.urbandictionary.com/v0/random?', (err, res, body) => {
            var body = JSON.parse(body);
            body.list.sort((a,b)=>{
                return (b.thumbs_up-b.thumbs_down) - (a.thumbs_up-a.thumbs_down);
            })
            embed.title = body.list[0].word;
            embed.description = body.list[0].definition;
            embed.url = body.list[0].permalink;
            embed.fields = [
                {
                    name: 'Example',
                    value: body.list[0].example
                }
            ]

            bot.sendMessage({
                to: channelID,
                embed: embed
            }, (err)=>{
                if (err){
                    console.error(err)
                    console.log(JSON.stringify(body))
                }
            })
        })
    }
};