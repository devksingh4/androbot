module.exports = (client, message, queue, track) => {
    if (!message.content.toLowerCase().includes("loadsaved")) {
        message.channel.send(`${client.emotes.music} - ${track.title} has been added to the queue!`);
    }
};