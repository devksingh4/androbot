const request = require('request');

module.exports = {
    name: 'meme',
    aliases: ['memes'],
    category: 'Reddit',
    utilisation: '{prefix}meme <number of memes = 1>',
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      },      
    execute(client, message, args) {
        const numPosts = parseInt(Math.ceil(args[0])) || 1
        if (numPosts > 10 || numPosts < 1){
            return message.channel.send(`${client.emotes.error} - Please provide a reasonable number of memes!`);
        }
        request(`https://www.reddit.com/r/memes/hot.json`, { json: true }, (err, res, body) => {
            if (err) { return message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`) }
            const json = body;
            let posts = json.data.children.filter(post => post.data.pinned == false && post.data.url_overriden_by_dest == undefined && post.data.is_video == false).map(post => post.data);
            request(`https://www.reddit.com/r/memes/rising.json`, { json: true }, (err, res, body) => { 
                if (err) { return message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`) }
                const json = body;
                posts.concat(json.data.children.filter(post => post.data.pinned == false && post.data.url_overriden_by_dest == undefined && post.data.is_video == false).map(post => post.data));
            })
            posts = this.shuffle(posts)
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
        });
    },
};