const jsonfile = require('jsonfile')
const fs = require('fs')
var path = require('path');

module.exports = {
    name: 'showSaved',
    aliases: ['showsaved'],
    category: 'Music',
    utilisation: '{prefix}showSaved',

    async execute(client, message) {

        const file = path.join(__dirname, `saved/${message.author.id}.json`)
        let curr;
        if (fs.existsSync(file)) {
            curr = await jsonfile.readFile(file).catch(e => console.error(e))
        } else {
            return message.channel.send(`${client.emotes.error} - You do not have any saved tracks!`)
        }
        let resp = '**Saved Tracks**\n\n'
        i = 1
        for (const track of curr) {
            resp += `${i}. **${track.title}** - ${track.channel.name}\n`
            i+=1
        }
        message.channel.send(resp)
    },
};