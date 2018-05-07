var fs = require('fs');

module.exports = {
	command: 'mute',
	aliases: [],
	category: 'Fun',
	description: 'Mute target',
	usage: 'mute <target>',
	execute: (bot, user, userID, channelID, args, event) => {
        let muted = require('../data/muted.json');
        var name = args[0].substr(2, args[0].length-3)
        if(muted[name] == undefined || muted[name] == false){
            muted[name] = true;
        }
        else{
            muted[name] = false;
        }
        fs.writeFile('./data/muted.json', JSON.stringify(muted), (err)=>{
            if(err) throw err
        })
    }
}