const twitter = require('../twitter');
const db = require('../db/store');
const Handlebars = require('handlebars');
const fs = require('fs');
function createTemplate(template, { account, tweet }) {
  return template({ account, tweet });
}

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
      account = twitter.getAccount(params.accountId)._json;
      db.load('tweet').then(tweets => {
        tweet = tweets[params.tweetId];
        console.log(tweet)
        const template = Handlebars.compile(fs.readFileSync(`${__dirname}/view/tweetPost.html`).toString());
        res.send(createTemplate(template, { account, tweet }));
      });
    } catch (err) {
      console.log(err);
      res.send({});
    }
  });
};
