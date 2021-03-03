module.exports = {
    name: 'remove',
    aliases: ['rm'],
    category: 'Music',
    utilisation: '{prefix}remove [position',

    execute(client, message) {
        const args = message.content.slice(1).trim().split(' ');
        if (args.length != 2) {
            return message.channel.send(`${client.emotes.error} - Remove position must be specified!`);
        }

        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing!`);

        
        let currQueue = client.player.getQueue(message)
        if (args[1] > currQueue.length) {
            return message.channel.send(`${client.emotes.error} - Position may not be greater than ${currQueue.length}!`);
        }
        try {
            delete currQueue.tracks[paeseInt(arr[1]) - 1];
        } catch {
            return message.channel.send(`${client.emotes.error} - Could not remove track!`);
        }
        client.player.queues.set(message.guild.id, currQueue)
        message.channel.send(`${client.emotes.success} - Track removed!`);
    },
};