const TWITTER_CONSUMER_KEY = process.env.keyc ?
  process.env.keyc : require('./key').twitter.consumer;
const TWITTER_CONSUMER_SECRET = process.env.keys ?
  process.env.keys : require('./key').twitter.secret;

const mockAccount = {
  token: '2979592160-W4csr6IJctsZVBpf9ShP2d1GIDRs1lParORwpTl',
  tokenSecret: 'jgSj6pc9VNRi5kyZTPCEpUGi9YejRLC0xUM8iw9GyEAz0',
};
const Container = require('./twitterContainer');

const container = new Container({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
});

container.setAccount('test', mockAccount);
container.onStream((tweet) => console.log(tweet));
console.log(container);