const axios = require('axios');
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
    postMap(post) {
        return post.data
    },
    execute(client, message, args) {
        const numPosts = parseInt(Math.ceil(args[0])) || 1
        if (numPosts > 10 || numPosts < 1) {
            return message.channel.send(`${client.emotes.error} - Please provide a reasonable number of memes!`);
        }
        async.parallel([
            (callback) => {
                axios.get(`https://www.reddit.com/r/memes/hot.json`).then(({data}) => {
                    const json = data;
                    const posts = json.data.children.filter(this.postFilter).map(this.postMap);
                    callback(false, posts);
                }).catch((err) => {
                  console.log(err)
                  callback(true)
                })
            },
            (callback) => {
              axios.get(`https://www.reddit.com/r/memes/hot.json`).then(({data}) => {
                  const json = data;
                  const posts = json.data.children.filter(this.postFilter).map(this.postMap);
                  callback(false, posts);
              }).catch((err) => {
                console.log(err)
                callback(true)
              })
          },
        ], (err, results) => {
            if (err) {
                console.log(err);
                message.channel.send(`${client.emotes.error} - Could not get memes from Reddit!`);
                return;
            }
            let posts = []
            for (const result of results) {
                posts = posts.concat(result)
            }
            this.shuffle(posts)
            let selected = []
            for (i = 0; i < numPosts; i++) {
                const index = Math.floor(Math.random() * posts.length);
                selected.push(posts[index]);
                posts.splice(index, 1);
            }
            selected = selected.map(post => {
                if (post.domain == "v.redd.it") {
                    return {
                        title: post.title,
                        description: "This post is a video. Click on the post title to view the full video.",
                        url: post.url,
                        author: {
                            name: post.author
                        },
                        fields: [{
                            name: "Score",
                            value: post.score,
                            inline: true
                        }, {
                            name: "Awards Recieved",
                            value: post.total_awards_received,
                            inline: true
                        }],
                        image: {
                            url: post.preview.images[0].source.url.replace('&amp;', '&')
                        },
                        footer: {
                            text: 'Powered by Reddit',
                        },
                        timestamp: new Date(post.created_utc * 1000)
                    }
                } else {
                    return {
                        title: post.title,
                        url: post.url,
                        author: {
                            name: post.author
                        },
                        fields: [{
                            name: "Score",
                            value: post.score,
                            inline: true
                        }, {
                            name: "Awards Recieved",
                            value: post.total_awards_received,
                            inline: true
                        }],
                        image: {
                            url: post.url.replace('.gifv', '.gif')
                        },
                        footer: {
                            text: 'Powered by Reddit',
                        },
                        timestamp: new Date(post.created_utc * 1000)
                    }
                }
            })
            for (const post of selected) {
                message.channel.send({
                    embed: post
                })
            }
        })

    },
};