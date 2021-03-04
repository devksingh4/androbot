module.exports = {
    name: 'remove',
    aliases: ['rm'],
    category: 'Music',
    utilisation: '{prefix}remove [**position]',

    execute(client, message) {
        const args = message.content.slice(1).trim().split(' ');
        if (args.length < 2) {
            return message.channel.send(`${client.emotes.error} - Remove position must be specified!`);
        }
        if (args.length > 100) {
            return message.channel.send(`${client.emotes.error} - Too many tracks to remove!`);
        }
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing!`);

        
        let currQueue = client.player.getQueue(message)
        if (args[1] >= currQueue.length - 1) {
            return message.channel.send(`${client.emotes.error} - Position may not be greater than ${currQueue.length}!`);
        }
        let arr = args
        try {
            arr.shift()
            for (const item of arr) {
                console.log(item)
                client.player.remove(message, parseInt(item) - 1)
            }
        } catch {
            return message.channel.send(`${client.emotes.error} - Could not remove track(s)!`);
        }
        message.channel.send(`${client.emotes.success} - Track removed!`);
    },
};