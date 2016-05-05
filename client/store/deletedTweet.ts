import { CollectionStore } from '../flux';
import { Map } from 'immutable';
import { DELETETWEET } from '../constant/deleteTweet';
import { DeleteTweet } from '../model/tweet';

export function handler(action: any, state) {
  switch (action.type) {
    case DELETETWEET: {
      const id = String(action.id);
      return state.set(id, new DeleteTweet(action.params));
    }
  };
  return state;
}

export class DeleteTweetStore extends CollectionStore<DeleteTweet> {
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