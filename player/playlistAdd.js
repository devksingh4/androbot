module.exports = (client, message, queue, playlist) => {
    if (!message.content.toLowerCase().includes("loadsaved")) {
        message.channel.send(`${client.emotes.music} - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs)!`);
    }
};