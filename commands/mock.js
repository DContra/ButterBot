module.exports = {
	command: 'mock',
	aliases: [],
	category: 'Fun',
	description: 'Change text to the form of the Spongebob Meme.',
	usage: 'mock <text>',
	execute: (bot, user, userID, channelID, args, event) => {
		bot.sendMessage({
            to: channelID,
            message: memeify(args.join(' '))
        });
	}
};

function memeify(str, base = 3){ //str is the string to memeify, base is the number we use to randomly change the casing of the letter
	str = str.split('').map(function(x){ //split the string into an array. then map
    //Get a random intiger between 0 and 99
		ran = Math.floor(Math.random()*100);
    
    //If the random integer is perfectly divisible by our base
		if(ran % base == 0){
      //Change our value to uppercase
			return x.toUpperCase();
		}
		else{
      //Other wise it stays lower
			return x.toLowerCase();
			}
	}).join(''); // Join the string back together
	return str; // return it
}