import Store from '../flux';
import { Map } from 'immutable';
import { DELETETWEET } from '../constant/deleteTweet';
import { DeleteTweet } from '../model/tweet';

interface deleteTweetCollection extends Map<string, DeleteTweet>{ }

export function handler(action: any, state: deleteTweetCollection) :deleteTweetCollection{
  switch (action.type) {
    case DELETETWEET: {
      const id = String(action.id);
      return state.set(id, new DeleteTweet(action.params));
    }
  };
  return state;
}

export class DeleteTweetStore extends Store<deleteTweetCollection> {
  getAllDeleted() {
    return this.state.toJS();
  }
}

const initState = Map<string, DeleteTweet>();
export const DeleteTweetStoreFactory = ({ state = initState, actions = []}) => {
  const newState = state || initState;
  return new DeleteTweetStore(newState, handler, actions);
}

export default DeleteTweetStoreFactory;