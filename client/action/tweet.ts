import { ADDTWEET } from '../constant/tweet';
import { TweetModel } from '../model/tweet';
import { command } from '../flux';
import * as request from 'axios';
export function addTweet(id, tweet) {
  command(ADDTWEET, { id, tweet });
}

export function postTweet(userId, tweet: TweetModel) {
  return request.post('/tweet/update', Object.assign({}, { options: tweet.post() }, { key: userId }))
    .then(value => {
      return value.data;
    })
}

export function destroyTweet(userId, tweet: TweetModel) {
  return request.post('/tweet/destroy', Object.assign({}, { options: tweet.destroy() }, { key: userId }))
    .then(res => res.data)
}
