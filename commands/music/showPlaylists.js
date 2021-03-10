const jsonfile = require('jsonfile')
const fs = require('fs')
var path = require('path');

module.exports = {
    name: 'showPlaylists',
    aliases: ['showPlaylists'],
    category: 'Music',
    utilisation: '{prefix}showPlaylists',

    async execute(client, message, args) {
        const files = fs.readdirSync('./saved/').filter(filename => filename.includes(message.author.id));
        let playlistNames;
        if (files.length > 0) {
            playlistNames = files.map(filename => filename.replace(message.author.id, "").replace(".json", ""))
        } else {
            return message.channel.send(`${client.emotes.error} - You do not have any saved tracks!`)
        }
        playlistNames = playlistNames.filter(x => x != null);
        let resp = `**${message.author.username}'s playlists**\n\n`
        let i = 1
        for (const name of playlistNames) {
            try {
                resp += `${i}. **${name}**\n`
                i+=1
            } catch {
                
            }
        }
        message.channel.send(resp)
    },
};