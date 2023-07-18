module.exports = {
    name: 'motivate',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}motivate <user>',

    execute(client, message, args) {
        const fallbackAuthor = `<@${message.author.id}>`
        message.channel.send(`${args[0] || fallbackAuthor} do your work or I will steal your kneecaps, you lazy worthless piece of shit.`);
    },
};
