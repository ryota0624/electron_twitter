import * as assert from 'power-assert';
import { Map, Record } from 'immutable';

import { TweetStore, handler } from '../../../client/store/tweet';
import { AdminAccountModel } from '../../../client/model/user';
import { TweetModel } from '../../../client/model/tweet';

import { command } from '../../../client/flux';

import { ADDTWEET } from '../../../client/constant/tweet';
import { sample } from '../../../client/store/sampleTweet';

describe('TweetModel', () => {
  const tweet = new TweetModel(sample);
  it('tweet instance', () => assert(tweet))
  it('tweet have a user prop', () => assert.equal(tweet.user.id, sample.user.id));
  it('tweet#retweeted', () => assert(tweet.retweeted()));
})

describe('tweetStoreHandler', () => {
  it('add tweet', () => {
    const initState = Map<string, TweetModel>();
    const mockTweet = new TweetModel(sample);
    const state = handler({ type: ADDTWEET, id: sample.id_str, tweet: sample }, initState);
    assert.deepEqual(state.get(sample.id_str), mockTweet);
  })
})

describe('tweetStore', () => {
  const initState = Map<string, TweetModel>();
  const mockTweet = new TweetModel(sample);
  const mockAccount = new AdminAccountModel(Object.assign({}, sample.user, {timeLine: [sample.id_str]}));
  const store = new TweetStore(initState, handler);
  it('get AdminAccount TimeLine', () => {
    store.addChangeListener(() => {
      const timeline = store.getAccountTimeLine(mockAccount);
      assert.equal(timeline.length, 1);
    })
    command(ADDTWEET, sample);
  })
})