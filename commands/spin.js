var gun = {}

module.exports = {
	command: 'spin',
	aliases: ['roulette'],
	category: 'Fun',
	description: 'Spins a 6 shooter pistol. Feeling lucky?',
	usage: 'spin',
	execute: (bot, user, userID, channelID, args, event) => {
		if(gun[channelID] == undefined ) gun[channelID] = {cylinder: []}

		if(args[0] == 'reload'){
			 gun[channelID].cylinder = load(6,1)
			 bot.sendMessage({
				to:channelID,
				message: `Gun reloaded with ${6} chambers and ${1} bullet`
			}) 
		}

		else{
			if(gun[channelID].cylinder.length == 0 || !gun[channelID].cylinder.includes(1)){
				bot.sendMessage({
					to:channelID,
					message: `Gun is empty. Please reload it`
				})
			}
			else{
				bot.sendMessage({
					to:channelID,
					message: gun[channelID].cylinder[0] == 1 ? ':gun: You\'re dead <@!'+userID+'>' : ':stuck_out_tongue_winking_eye: You\'re safe <@!'+userID+'>'
				}, (err)=>{
					if(err) console.log(err)
					if(gun[channelID].cylinder[0]){
						bot.sendMessage({
							to:channelID,
							message:`.timeout <@${userID}> 60`
						})
					}
					gun[channelID].cylinder.shift();
				})
			}
		}
	}
};

function load(chambers, bullets){
    var a = [];
    for(var i = 0; i < chambers; i++){
        a.push(0)
    }
    while(bullets != 0){
        var rand = Math.floor(Math.random() * chambers)
        if(a[rand] == 0){
            a[rand] = 1;
            bullets--;
        }
	}
    return a;
}