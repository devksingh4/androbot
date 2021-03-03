function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

module.exports = {
    name: 'move',
    aliases: ['mv'],
    category: 'Music',
    utilisation: '{prefix}move [old position] [new position]',

    execute(client, message) {
        const args = message.content.slice(1).trim().split(' ');
        if (args.length != 3) {
            return message.channel.send(`${client.emotes.error} - Both old and new position must be specified!`);
        }

        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing!`);

        
        let currQueue = client.player.getQueue(message)
        if (args[1] > currQueue.length || args[2] > currQueue.length) {
            return message.channel.send(`${client.emotes.error} - Old and new positions may not be greater than ${currQueue.length}!`);
        }
        currQueue.tracks = array_move(currQueue.tracks, args[1] - 1, args[2] - 1)
        client.player.queues.set(message.guild.id, currQueue)
        message.channel.send(`${client.emotes.success} - Track moved!`);
    },
};