module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme <number of memes = 1>',

    execute(client, message, args) {
        message.channel.send(`${client.emotes.error} - Not yet implemented!`)
    },
};