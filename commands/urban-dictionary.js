var request = require('request');
var embed = require('../styling/urban_embed.json');

module.exports = {
    command: 'urban',
    aliases: ['udefine', 'urban-dictionary'],
    category: 'Fun',
    description: 'Use Urban Dictionary to define your word',
    usage: 'urban',
    execute: (bot, user, userID, channelID, args, event) => {
        request.get('http://api.urbandictionary.com/v0/define?term=' + escape(args.join(' ')), (err, res, body) => {
            var body = JSON.parse(body);

            if(body.result_type == 'no_results'){
                embed.title = 'Sorry!'
                embed.description = 'There were no results found on Urban Dictionary for \''+args.join(' ')+'\''
                bot.sendMessage({
                    to: channelID,
                    embed: embed
                })
                return;
            }

            embed.title = args.join(' ');
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
                }
            })
        })
    }
};