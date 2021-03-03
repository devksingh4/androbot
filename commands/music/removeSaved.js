const jsonfile = require('jsonfile')
const fs = require('fs')
var path = require('path');
const { Track } = require('discord-player');

module.exports = {
    name: 'removeSaved',
    aliases: ['removesaved', 'rmsaved'],
    category: 'Music',
    utilisation: '{prefix}removeSaved [index]',

    async execute(client, message, args) {
        console.log(args)
        const file = path.join(__dirname, `saved/${message.author.id}.json`)
        let curr;
        if (fs.existsSync(file)) {
            curr = await jsonfile.readFile(file).catch(e => console.error(e))
        } else {
            return message.channel.send(`${client.emotes.error} - You do not have any saved tracks!`)
        }
        try {
            delete curr[parseInt(args[0]) - 1]
        } catch {
            return message.channel.send(`${client.emotes.error} - Could not delete this track from your saved tracks!`)
        }
        curr = curr.filter(x => x != null);
          
        jsonfile.writeFile(file, curr).catch(error => {console.error(error); message.channel.send(`${client.emotes.error} - Could not delete this track from your saved tracks!`);})
        return message.channel.send(`${client.emotes.success} - **Track ${args[0]}** removed from your saved tracks!`)
    },
};