var fs = require('fs');

module.exports = {
	command: 'mute',
	aliases: [],
	category: 'Fun',
	description: 'Mute target',
	usage: 'mute <target>',
	execute: (bot, user, userID, channelID, args, event) => {
        let muted = require('../data/muted.json');
        var name = event.d.mentions[0].id
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