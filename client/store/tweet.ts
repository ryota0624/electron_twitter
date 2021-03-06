import { CollectionStore, Collection } from '../flux';
import { Map, Record } from 'immutable';
import { ADDTWEET, FAVEDTWEET } from '../constant/tweet';
import { TweetModel } from '../model/tweet';
import { AdminAccountModel } from '../model/user';


export function handler(action: any, state: Collection<TweetModel>):Collection<TweetModel> {
  switch (action.type) {
    case ADDTWEET: {
      const id = String(action.id)
      return state.set(id, new TweetModel(action.tweet));
    }
    case FAVEDTWEET: {
      const tweet = action.tweet;
      const id = tweet.id_str;
      return state.set(id, new TweetModel(action.tweet));
    }
  }
  return state;
}

export class TweetStore extends CollectionStore<TweetModel> {
  getById(id: string) {
    return this.state.get(String(id));
  }
  getUserTimeLine(userId) {
    return this.state.filter(tweet => tweet.user.id_str === userId);
  }
  getTweetByIds(tweetIds: Array<string>) {
    return tweetIds.map(id => this.getById(id)).filter(item => item ? true : false);
  }
  getAccountTimeLine(account: AdminAccountModel, options = { num: 5 }) {
    const { num } = options;
    return this.getTweetByIds(account.timeLine).sort(this.sortTimeStamp).slice(0, num);
  }
  getAllTweet() {
    return this.state.toArray().sort(this.sortTimeStamp);
  }
  sortTimeStamp(a, b) {
    return Number(b.timestamp_ms) - Number(a.timestamp_ms) ;
  }
}

export const TweetStoreFactory = (params) => {
  const { actions, state } = params;
  return new TweetStore(handler, actions, state);
}
export default TweetStoreFactory;