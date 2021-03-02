module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme [number of memes]',

    execute(client, message, args) {
        message.channel.send(`${client.emotes.error} - Not yet implemented!`)
    },
};