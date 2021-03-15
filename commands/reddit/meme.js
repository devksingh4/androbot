const request = require('request');

module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme <number of memes = 1>',
    execute(client, message, args) {
        const numPosts = parseInt(Math.ceil(args[0])) || 1
        if (numPosts > 10 || numPosts < 1){
            return message.channel.send(`${client.emotes.error} - Please provide a reasonable number of memes!`);
        }
        request(`https://www.reddit.com/r/memes/hot.json`, { json: true }, (err, res, body) => {
            if (err) { return message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`) }
            const json = body;
            let posts = json.data.children.filter(post => post.data.pinned == false && post.data.url_overriden_by_dest == undefined && post.data.is_video == false).map(post => post.data);
            let selected = []
            for(i = 0; i < numPosts; i++) {
                const index = Math.floor(Math.random() * posts.length);
                selected.push(posts[index]);
                posts.splice(index, 1);
            }
            selected = selected.map(post => {
                return {title: post.title, url: post.url, author: {name: post.author}, fields: [{name: "Upvotes", value: post.ups, inline: true }, {name: "Downvotes", value: post.downs, inline: true }], image: {url: post.url.replace('.gifv', '.gif')}, timestamp: new Date()}
            })
            for (const post of selected) {
                message.channel.send({embed: post})
            }
        });
    },
};