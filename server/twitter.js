const TWITTER_CONSUMER_KEY = process.env.keyc ?
  process.env.keyc : require('./key').twitter.consumer;
const TWITTER_CONSUMER_SECRET = process.env.keys ?
  process.env.keys : require('./key').twitter.secret;

const Container = require('./twitterContainer');

const container = new Container({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
});

module.exports = container;
