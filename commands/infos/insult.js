module.exports = {
    name: 'insult',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}insult <user>',

    execute(client, message, args) {
        message.channel.send(`${args[0]} why are you so worthless? You bring dishonor to your whole family! Your parents did not work this hard to have a child as WORTHLESS as you!`);
    },
};
