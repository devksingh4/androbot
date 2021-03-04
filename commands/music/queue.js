module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        const queue = client.player.getQueue(message); // do not show currently playing track in queue

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No songs currently playing!`);
        let base; 
        try {
            base = `**Server queue - ${message.guild.name} ${client.emotes.queue} ${client.player.getQueue(message).loopMode ? '(looped)' : ''}**\nCurrently playing: **${queue.playing.title}** | *${queue.playing.author}*\n\n`
            base += queue.tracks.slice(1).map((track, i) => {
                return `**#${i + 1}** - ${track.title} | ${track.author} (requested by: ${track.requestedBy.username})`
            }).slice(0, 5).join('\n')
            if (queue.tracks.length > 1) {
                base += `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length - 1}** song(s)...`}`
            }
        } catch {

        }
        message.channel.send(base);
    },
};