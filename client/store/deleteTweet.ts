import { CollectionStore, Collection } from '../flux';
import { Map } from 'immutable';
import { DELETETWEET } from '../constant/deleteTweet';
import { DeleteTweet } from '../model/tweet';

export function handler(action: any, state: Collection<DeleteTweet>) :Collection<DeleteTweet> {
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

export const DeleteTweetStoreFactory = (params) => {
  const { actions, state } = params;
  return new DeleteTweetStore(handler, actions, state);
}

export default DeleteTweetStoreFactory;