const TWITTER_CONSUMER_KEY = process.env.keyc ?
  process.env.keyc : require('../../server/key').twitter.consumer;
const TWITTER_CONSUMER_SECRET = process.env.keys ?
  process.env.keys : require('../../server/key').twitter.secret;

const mockAccount = {
  token: '2979592160-W4csr6IJctsZVBpf9ShP2d1GIDRs1lParORwpTl',
  tokenSecret: 'jgSj6pc9VNRi5kyZTPCEpUGi9YejRLC0xUM8iw9GyEAz0',
};
const Container = require('../../server/twitterContainer');
const assert = require('power-assert');
describe('twitterContainer', () => {
  const container = new Container({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
  });
  describe('setAccount', () => {
    it('setAccount; accounts', () => {
      container.setAccount('test', mockAccount, { setStream: false });
      assert.deepEqual(container.accounts.get('test'), mockAccount);
    });
  });
  describe('tweet', () => {
    it('postTweet -> fav -> destroyfav -> delete',
      () => container.postTweet('test', { status: new Date() })
      .then(data => data.id_str)
      .then(id => {
        it('post:id', () => assert(true));
        return id;
      })
      .then(id => container.createFav('test', id))
      .then(data => container.destroyFav('test', data.id_str))
      .then(data => container.deleteTweet('test', data.id_str))
      .then((data) => assert(data.id)));
    it('favList', () => container.getFavList('test')
      .then(data => assert(data.length)));
    it('getTweet', () => container.getTweet('test', '210462857140252672')
      .then(res => assert(res.id)));
  });
});
