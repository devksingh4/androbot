module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme <number of memes = 1>',

    execute(client, message, args) {
        if(args.length > 0) {
            message.channel.send(`!meme ${args[1]}`)
        }
    },
};