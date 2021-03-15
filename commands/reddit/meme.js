const request = require('request');
const async = require('async')
module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme <number of memes = 1>',
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },      
    postFilter(post) {
        return post.data.pinned == false && post.data.url_overriden_by_dest == undefined && post.data.is_video == false
    },
    execute(client, message, args) {
        const numPosts = parseInt(Math.ceil(args[0])) || 1
        if (numPosts > 10 || numPosts < 1){
            return message.channel.send(`${client.emotes.error} - Please provide a reasonable number of memes!`);
        }
        async.parallel([
            (callback) => {
                request(`https://www.reddit.com/r/memes/hot.json`, { json: true }, (err, res, body) => {
                    if(err) { console.log(err); message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`); callback(true); return; }
                    const json = body;
                    const posts = json.data.children.filter(this.postFilter).map(post => post.data);
                    callback(false, posts);
                })
            },
            (callback) => {
                request(`https://www.reddit.com/r/memes/new.json`, { json: true }, (err, res, body) => {
                    if(err) { console.log(err); message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`); callback(true); return; }
                    const json = body;
                    const posts = json.data.children.filter(post => this.postFilter).map(post => post.data);
                    callback(false, posts);
                })
            },
        ], (err, results) => {
            let posts = []
            for (const result of results) {
                posts = posts.concat(result)
            }
            this.shuffle(posts)
            let selected = []
            for(i = 0; i < numPosts; i++) {
                const index = Math.floor(Math.random() * posts.length);
                selected.push(posts[index]);
                posts.splice(index, 1);
            }
            selected = selected.map(post => {
                return {title: post.title, url: post.url, author: {name: post.author}, fields: [{name: "Score", value: post.score, inline: true }, {name: "Awards Recieved", value: post.total_awards_received, inline: true }], image: {url: post.url.replace('.gifv', '.gif')}, timestamp: new Date(post.created_utc * 1000)}
            })
            for (const post of selected) {
                message.channel.send({embed: post})
            }
        })

    },
};