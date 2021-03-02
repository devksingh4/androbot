module.exports = {
    name: 'poll',
    aliases: [],
    category: 'Admin',
    utilisation: '{prefix}poll [question] **options',

    execute(client, message, args) {
        if (args.length < 1) {
            return message.channel.send(`${client.emotes.error} - Please specify a poll question!`)
        }
        input = args.join(' ')
        const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
        let arguments = [];
        input.match(regex).forEach(element => {
            if (!element) return;
            return arguments.push(element.replace(/"/g, ''));
        });
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        const originalQuestion = arguments[0]
        opts = []
        let thumbs = false

        if (arguments.length > 26) {
            return message.channel.send(`${client.emotes.error} - Too many options specified!`)
        }
        if (arguments.length == 1) {
            opts.push(':thumbsup:')
            opts.push(':thumbsdown:')
            arguments.shift()
            arguments = ["Yes", "No"]
            thumbs = true
        } else {
            arguments.shift()
            opts = letters.slice(0, arguments.length).map(x => `:regional_indicator_${x}:`)
        }
        let field_opts = []
        for (let i = 0; i < opts.length; i++) {
            field_opts.push({name: arguments[i], value: opts[i], inline: true})
        }
        message.channel.send({
            embed: {
                color: 'RED',
                title: originalQuestion,
                author: { name: message.author.username, iconURL: message.author.displayAvatarURL() },
                fields: field_opts,
                timestamp: new Date(),
            },
        }).then(message => {
            if (!thumbs) {
                for (let i = 0; i < opts.length; i++) {
                    const rawemojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']
                    message.react(rawemojis[i])
                }
            } else {
                message.react('👍')
                message.react('👎')
            }

        });
    },
};