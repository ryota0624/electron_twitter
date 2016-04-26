'use strict';
const Twit = require('twit');
const Event = require('events');
class TwitterContainer extends Event {
  constructor(keys) {
    super();
    this.streamCbs = [];
    this.streams = [];
    this.keys = keys;
    this.twit = (accessToken, accessTokenSecret) => new Twit({
      consumer_key: this.keys.consumerKey,
      consumer_secret: this.keys.consumerSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
    });
    this.accounts = new Map();
  }
  setAccount(key, account) {
    this.accounts.set(key, account);
    const twit = this.twit(account.token, account.tokenSecret);
    const stream = Object.assign(twit.stream('user'), { account });
    this.streamCbs.forEach(cb => this._appendCallback(stream, cb));
    this.streams.push(stream);
  }
  postTweet(key, options) {
    const account = this.accounts.get(key);
    const twit = this.twit(account.token, account.tokenSecret);
    twit.post('statuses/update', options, (err, data, response) => {
      options.cb(err, data, response);
    });
  }
  onStream(cb) {
    this.streamCbs.push(cb);
    this.streams.forEach(stream => this._appendCallback(stream, cb));
  }
  _appendCallback(stream, cb) {
    stream.on('tweet', (tweet) => cb(tweet, stream.account));
  }
}

module.exports = TwitterContainer;
