module.exports = (client, message) => {
    if (message.content.toLowerCase().includes("no motivation")) {
        console.log(`Giving ${message.author.username} motivation.`)
        message.channel.send(`<@${message.author.id}> do your work or I will steal your kneecaps, you lazy worthless piece of shit.`);
        return
    }
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.discord.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};
