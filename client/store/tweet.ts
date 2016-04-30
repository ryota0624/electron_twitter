import Store from '../flux';
import { Map, Record } from 'immutable';
import { ADDTWEET } from '../constant/tweet';
import { TweetModel } from '../model/tweet';
import { AccountModel, AdminAccountModel } from '../model/account';


interface tweetCollectionn extends Map<string, TweetModel>{}

export function handler(action: any, state: tweetCollectionn) {
  switch (action.type) {
    case ADDTWEET: {
      return state.set(action.id, new TweetModel(action.tweet));
    }
  }
  return state;
}

export class TweetStore extends Store<tweetCollectionn> {
  getById(id: string) {
    return this.state.get(id);
  }
  getUserTimeLine(userId) {
    return this.state.filter(tweet => tweet.user.id_str === userId);
  }
  getTweetByIds(tweetIds: Array<string>) {
    return tweetIds.map(id => this.getById(id));
  }
  getAccountTimeLine(account: AdminAccountModel) {
    return this.getTweetByIds(account.timeLine);
  }
  getAllTweet() {
    return this.state.toArray();
  }
}

const initState = Map<string, TweetModel>()
// const tweetStore = new TweetStore(initState, handler);
export const TweetStoreFactory = ({state = initState, actions = []}) => {
  const newState = state ? state : initState;
  return new TweetStore(newState, handler, actions);
}
export default TweetStoreFactory;