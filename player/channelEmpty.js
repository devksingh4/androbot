module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Music stopped as there are no more members in the voice channel!`);
};