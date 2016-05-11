const twitter = require('../twitter');
const db = require('../db/store');
const Handlebars = require('handlebars');
const fs = require('fs');
const template = Handlebars.
  compile(fs.readFileSync(`${__dirname}/view/tweetPost.html`).toString());

module.exports = (app, server, passport) => {
  app.post('/tweet/update', (req, res) => {
    const key = req.body.key;
    const options = req.body.options;
    twitter.postTweet(key, options).then(data => res.send(data));
  });
  app.post('/tweet/destroy', (req, res) => {
    const key = req.body.key;
    const options = req.body.options;
    twitter.deleteTweet(key, options.id_str).then(data => res.send(data));
  });
  app.get('/tweet/:data', (req, res) => {
    let account = {};
    let tweet = {};
    try {
      const params = JSON.parse(req.params.data);
      account = twitter.getAccount(params.accountId);
      db.load('tweet').then(tweets => {
        tweet = tweets[params.tweetId];
        const accountData = JSON.stringify(account);
        const tweetData = JSON.stringify(tweet);
        res.send(template({ account, tweet, accountData, tweetData }));
      });
    } catch (err) {
      console.log(err);
      res.send({});
    }
  });
  app.post('/fav/create', (req, res) => {
    const key = req.body.key;
    const tweetId = req.body.options.id;
    twitter.createFav(key, tweetId).then(data => res.send(data));
  });
};
