const jsonfile = require('jsonfile')
const fs = require('fs')
var path = require('path');

module.exports = {
    name: 'save',
    category: 'Music',
    utilisation: '{prefix}save [name/URL]',

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`${client.emotes.error} - Please indicate the title of a song!`);
        const playlist = args.length > 1 ? args.pop() : "default";
        const res = await client.player.search(args.join(" "))
        const firstTrack = res[0]
        if (firstTrack == null) {
            return message.channel.send(`${client.emotes.error} - Could not get track information!`)
        }
        const file = path.join(__dirname, `saved/${message.author.id}-${playlist}.json`)
        if (fs.existsSync(file)) {
            const curr = await jsonfile.readFile(file).catch(e => console.error(e))
            curr.push(firstTrack)
            jsonfile.writeFile(file, curr)

        } else {
            fs.closeSync(fs.openSync(file, 'w'));
            fs.writeFileSync(file, '[]')
            const curr = [firstTrack]
            jsonfile.writeFile(file, curr).catch(error => console.error(error))
        }
        if ((message.guild.me.voice.channel && message.member.voice.channel.id == message.guild.me.voice.channel.id) && (message.member.voice.channel) && (playlist == "default")) {
            client.player.play(message, firstTrack.url)
        }
        message.channel.send(`${client.emotes.success} - **${firstTrack.title}** added to your saved tracks!`)
    },
};