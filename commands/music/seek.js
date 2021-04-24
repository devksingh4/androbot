module.exports = {
    name: 'seek',
    aliases: ['s'],
    category: 'Music',
    utilisation: '{prefix}seek [time to skip to]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Please indicate the position to seek to!`);

        try {
            client.player.seek(message, args[0] * 1000);
            return message.channel.send(`${client.emotes.success} - Seeked to ${args[0]} seconds!`);
        } catch {
            return message.channel.send(`${client.emotes.error} - Please indicate a valid position to seek to!`);
        }
    },
};