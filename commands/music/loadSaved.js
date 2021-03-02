const jsonfile = require('jsonfile')
const fs = require('fs')
var path = require('path');
const { Track } = require('discord-player');

module.exports = {
    name: 'loadSaved',
    aliases: ['loadsaved', 'load'],
    category: 'Music',
    utilisation: '{prefix}loadSaved',

    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        const file = path.join(__dirname, `saved/${message.author.id}.json`)
        let curr;
        if (fs.existsSync(file)) {
            curr = await jsonfile.readFile(file).catch(e => console.error(e))
        } else {
            return message.channel.send(`${client.emotes.error} - You do not have any saved tracks!`)
        }
        curr = curr.reverse();
        for (const track of curr) {
            client.player.play(message, track.url);
        }
    },
};