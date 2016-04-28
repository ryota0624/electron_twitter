const twitter = require('../twitter');
module.exports = (app, server, passport) => {
  app.post('/tweet/update', (req, res) => {
    const key = req.body.key;
    const options = req.body.options;
    twitter.postTweet(key, options).then(data => res.send(data))
  });
  app.post('/tweet/destroy', (req, res) => {
    const key = req.body.key;
    const options = req.body.options;
    twitter.deleteTweet(key, options.id_str).then(data => res.send(data));
  });
};
