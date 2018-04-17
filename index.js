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
    token: auth.token
});

bot.on('ready', (event)=>{
    logger.info('Bot Connected');
    logger.info('Logged in as ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('disconnect', function (errMsg, code) {
    logger.error('Bot lost connection to discord');
    logger.error(`ErrMsg: ${errMsg} \r\n Code: ${code}`)
    bot.connect()
});

bot.on('message', (user, userID, channelID, message, event)=>{
    if(userID == bot.id){
        console.log(message)
        if(message.startsWith('.')){
            message = message.substr(1, message.length);
            var args = message.split(' ');
            var cmd = args[0].toLowerCase();
            args.shift();
            //If this is the root command name
            if(Commands[cmd] != undefined){
                Commands[cmd].execute(bot, user, userID, channelID, args, event);
            }
            //Otherwise search for aliases
            else{
                for(var command in Commands){
                    if(Commands[command].aliases.includes(cmd)){
                        Commands[command].execute(bot, user, userID, channelID, args, event);
                    }
                }
            }
        }
    }
});

logger.info('Starting Bot');
fs.readdir('./commands', (err,commands)=>{
    if (err) throw err;
    for (let i = 0; i < commands.length; i++){
        const command = require(path.join(__dirname, 'commands', commands[i]));
        Commands[command.command] = command;
    }
    logger.info(`Loaded Commands`);
    bot.connect();
})