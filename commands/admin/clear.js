module.exports = {
    name: 'clear',
    aliases: [],
    category: 'Admin',
    utilisation: '{prefix}clear [number of messages]',

    execute(client, message, args) {
        if (args.length < 1) {
            return message.channel.send(`${client.emotes.error} - Please specify the number of messages to delete!`)
        }
        if (parseInt(args[0]) > 100) {
            return message.channel.send(`${client.emotes.error} - Max 100 messages can be deleted!`)
        }
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.bulkDelete(parseInt(args[0]));
            } else {
                return message.channel.send(`${client.emotes.error} - You do not have permission to delete messages!`)
            }
        } catch(e) {
            return message.channel.send(`${client.emotes.error} - Messages could not be cleared!`)
        }
    },
};