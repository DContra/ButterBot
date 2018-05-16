var request = require('request');

module.exports = {
    command: 'urban',
    aliases: ['udefine', 'urban-dictionary'],
    category: 'Fun',
    description: 'Use Urban Dictionary to define your word',
    usage: 'urban',
    execute: (bot, user, userID, channelID, args, event) => {
        var embed = require('../styling/urban_embed.json');

        request.get('http://api.urbandictionary.com/v0/define?term=' + escape(args.join(' ')), (err, res, body) => {
            var body = JSON.parse(body);

            if(body.result_type == 'no_results'){
                embed.title = 'Sorry!'
                embed.description = 'There were no results found on Urban Dictionary for \''+args.join(' ')+'\'';
                embed.fields = [];
                embed.url = undefined
                bot.sendMessage({
                    to: channelID,
                    embed: embed
                })
                delete embed;
                return;
            }
            body.list.sort((a,b)=>{
                return (b.thumbs_up-b.thumbs_down) - (a.thumbs_up-a.thumbs_down);
            })
            embed.title = args.join(' ');
            embed.description = body.list[0].definition.substr(0,1990);
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
                if (err) console.error(err)
            })
        })
    }
};