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
  setAccount(key, account, optionsArg) {
    let options = { setStream: true };
    if (optionsArg) {
      options = optionsArg;
    }
    this.accounts.set(key, account);
    const twit = this.twit(account.token, account.tokenSecret);
    const stream = Object.assign(twit.stream('user'), { account });
    if (options.setStream) {
      this.streamCbs.forEach(cb => this.appendCallback(stream, cb));
    }
    this.streams.push(stream);
  }
  postTweet(key, options) {
    const account = this.accounts.get(key);
    const twit = this.twit(account.token, account.tokenSecret);
    return new Promise(res => {
      twit.post('statuses/update', options, (err, data, response) => {
        res(data);
      });
    });
  }
  deleteTweet(key, id) {
    const twit = this.getTwit(key);
    return new Promise(res => {
      twit.post('statuses/destroy/:id', { id }, (err, data) => res(data));
    });
  }
  createFav(key, id) {
    const twit = this.getTwit(key);
    return new Promise(res => {
      twit.post('favorites/create', { id }, (err, data) => {
        res(data);
      });
    });
  }
  destroyFav(key, id) {
    const twit = this.getTwit(key);
    return new Promise(res => {
      twit.post('favorites/destroy', { id }, (err, data) => {
        res(data);
      });
    });
  }
  getTwit(key) {
    const account = this.accounts.get(key);
    return this.twit(account.token, account.tokenSecret);
  }
  getTweet(key, id) {
    const twit = this.getTwit(key);
    return new Promise(res => {
      twit.get('statuses/show/:id', { id }, (err, data) => res(data));
    });
  }
  getFavList(key) {
    const twit = this.getTwit(key);
    return new Promise(res => {
      twit.get('favorites/list', {}, (err, data) => {
        res(data);
      });
    });
  }
  onStream(cb, optionsArg) {
    let options = { setStream: true };
    if (optionsArg) {
      options = optionsArg;
    }
    this.streamCbs.push(cb);
    if (options.setStream) {
      this.streams.forEach(stream => this.appendCallback(stream, cb));
    }
  }
  appendCallback(stream, cb) {
    stream.on('tweet', (tweet) => cb(tweet, stream.account));
  }
}

module.exports = TwitterContainer;
