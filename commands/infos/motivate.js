module.exports = {
    name: 'motivate',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}motivate <user>',

    execute(client, message, args) {
        message.channel.send(`${args[0]} do your work or I will steal your kneecaps, you lazy worthless piece of shit.`);
    },
};
