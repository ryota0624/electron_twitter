import { ADDTWEET, FAVEDTWEET } from '../constant/tweet';
import { TweetModel } from '../model/tweet';
import { command } from '../flux';
import * as request from 'axios';
export function addTweet(id, tweet) {
  command(ADDTWEET, { id, tweet });
}

export function postTweet(userId, tweet: TweetModel) {
  return request.post('/tweet/update', Object.assign({}, { options: tweet.post() }, { key: userId }))
    .then(res => res.data)
}

export function destroyTweet(userId, tweet: TweetModel) {
  return request.post('/tweet/destroy', Object.assign({}, { options: tweet.destroy() }, { key: userId }))
    .then(res => res.data)
}

export function createFav(userId, tweet: TweetModel) {
  command(FAVEDTWEET, { tweet: tweet.postFav() });
  return request.post('/fav/create', Object.assign({}, { options: { id: tweet.id_str } }, { key: userId }))
    .then(res => res.data)
}