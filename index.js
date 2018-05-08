var auth = require('./auth.json');
var fs = require('fs');
var path = require('path');

var logger = require('winston');
var Discord = require('discord.io');

var Commands = {};

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
    token: auth.bot_token
});

bot.on('ready', (event) => {
    logger.info('Bot Connected');
    logger.info('Logged in as ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('disconnect', function (errMsg, code) {
    logger.error('Bot lost connection to discord');
    logger.error(`ErrMsg: ${errMsg} \r\n Code: ${code}`)
    bot.connect()
});

bot.on('message', (user, userID, channelID, message, event) => {
    if (message.startsWith('.')) {
        message = message.substr(1, message.length);
        var args = message.split(' ');
        var cmd = args[0].toLowerCase();
        args.shift();
        args = args.filter(x=>{return x!=''});

        //If the command being called is for the list of commands
        if(cmd == 'commands'){
            var post = [];
            for(var key in Commands){
                post.push(`**${key}**\nDescription: ${Commands[key].description}\nUsage: .${Commands[key].usage}`)
            }
            bot.sendMessage({
                to:channelID,
                embed: {
                    color: 2,
                    title: 'Heres a list of my Commands!',
                    description:  post.join('\n')
                  }
            })
        }
        //Otherwise proceed as usual
        else {
            //If this is the root command name
            if (Commands[cmd] != undefined) {
                Commands[cmd].execute(bot, user, userID, channelID, args, event);
            }
            //Otherwise search through each command for aliases
            else {
                for (var command in Commands) {
                    if (Commands[command].aliases.includes(cmd)) {
                        Commands[command].execute(bot, user, userID, channelID, args, event);
                    }
                }
            }
        }
    }
});

logger.info('Starting Bot');
fs.readdir('./commands', (err, commands) => {
    if (err) throw err;
    for (let i = 0; i < commands.length; i++) {
        const command = require(path.join(__dirname, 'commands', commands[i]));
        Commands[command.command] = command;
    }
    logger.info(`Loaded Commands`);
    bot.connect();
})