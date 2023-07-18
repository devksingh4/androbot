module.exports = {
    name: 'insult',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}insult <user>',

    execute(client, message, args) {
        const fallbackAuthor = `<@${message.author.id}>`
        message.channel.send(`${args[0] || fallbackAuthor} why are you so worthless? You bring dishonor to your whole family! Your parents did not work this hard to have a child as WORTHLESS as you!`);
    },
};
