var jimp = require('jimp');
var fs = require('fs')

var white = 4294967295;
var black = 0;

module.exports = {
    command: 'black-and-white',
    aliases: ['bw'],
    category: 'Image Manipulation',
    description: 'Returns a photo in black and white. Note: This is not grayscale',
    usage: 'black-and-white <image URL>',
    execute: (bot, user, userID, channelID, args, event) => {
        if (args[0] == undefined || !ValidURL(args[0])) {
            bot.sendMessage({
                to: channelID,
                message: 'Invalid URL, please provide a valid URL to an image'
            })
            return
        }
        jimp.read(args[0], (err, image) => {
            if (err || image == undefined) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Invalid URL, please provide a valid URL to an image'
                })
                return
            }

            for (var i = 0; i < image.bitmap.height; i++) { // for each row in image
                for (var n = 0; n < image.bitmap.width; n++) { // for each column in image
                    var color = jimp.intToRGBA(image.getPixelColor(n, i))
                    var luma = 0.2989 * color.r + 0.5870 * color.g + 0.1140 * color.b;
                    
                    if (luma > 105) { //convert to white
                        image.setPixelColor(white, n, i)
                    } else { //convert to black
                        image.setPixelColor(black, n, i)
                    }
                }
            }

            image.write('./temp.jpg', () => {
                bot.uploadFile({
                    to: channelID,
                    file: './temp.jpg'
                }, () => {
                    fs.unlink('./temp.jpg', () => {})
                })
            })
        })
    }
};

function ValidURL(str) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return pattern.test(str);
}