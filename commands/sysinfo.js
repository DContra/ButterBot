var os = require('os');

module.exports = {
    command: 'sysinfo',
    aliases: [],
    category: 'Fun',
    description: 'Get info of system bot is running on',
    usage: 'sysinfo',
    execute: (bot, user, userID, channelID, args, event) => {

        var cpus = os.cpus()

        var embed = {
            author: {
                name: 'System Info',
            },
            fields: [{
                    name: "OS",
                    value: os.type(),
                    inline: true
                },
                {
                    name: 'HostName',
                    value: os.hostname(),
                    inline: true
                },
                {
                    name: 'CPU',
                    value: `Model: ${cpus[0].model} \nCores: ${cpus.length}`
                },
                {
                    name: 'Memory',
                    value: `Total: ${toGB(os.totalmem())} GB\nFree: ${toGB(os.freemem())} GB`,
                    inline: true
                },
                {
                    name: 'Uptime',
                    value: `${toHHMMSS(os.uptime())}`,
                    inline: true
                }
            ]
        }

        bot.sendMessage({
            to: channelID,
            embed: embed
        })
    }
}

function toGB(b){
    var GB = 1073741824 //bytes
    return Math.floor((b/GB)*100)/100
}
function toHHMMSS(secs){
    var sec_num = parseInt(secs, 10)    
    var hours   = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60    
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}