import Store from '../flux';
import { Map } from 'immutable';
import { UserModel } from '../model/user';
import { ADDUSER } from '../constant/user';

interface userCollection extends Map<string, UserModel>{}

export function handler(action: any, state: userCollection): userCollection {
  switch (action.type) {
    case ADDUSER: {
      return state.set(action.id, new UserModel(action.user));
    }
  }
  return state;
}

export class UserStore extends Store<userCollection> {
  getById(id: string) {
    return this.state.get(id);
  }
}

const initState = Map<string, UserModel>();
const UserStoreFactory = ({ state = initState, actions = [] }) => {
  const newState = state ? state : initState;
  return new UserStore(newState, handler, actions);
}

export default UserStoreFactory;