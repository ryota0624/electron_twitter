import Store from '../flux';
import { is, Map } from 'immutable';
import { ADDACCOUNT, UPDATE } from '../constant/adminAccount';
import { AdminAccountModel } from '../model/user';

interface accountCollectionn extends Map<string, AdminAccountModel>{}

export function handler(action: any, state: accountCollectionn): accountCollectionn {
  console.log(action.id)
  switch (action.type) {
    case ADDACCOUNT: {
      return state.set(action.id, new AdminAccountModel(action.account));
    };
    case UPDATE: {
      const id = String(action.id)
      const updateAccount = state.get(id);
      if (!updateAccount) return state;
      const nextState = state.set(id, updateAccount.updateTimeLine(action.params));
      return nextState;
    }
  }
  return state;
}

export class AdminAccountStore extends Store<accountCollectionn> {
  getById(id: string) {
    return this.state.get(id);
  }
  getAllUser() {
    return this.state
  }
}

export const initAccountDate = () => {
  if (typeof window === "undefined") return {};
  const accountJSON = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
  const keys = Object.keys(accountJSON);
  const accounts = {};
  // for (let i of keys) {
  //   const account = JSON.parse(accountJSON[i]._raw);
  //   accounts[String(i)] = new AdminAccountModel(account);
  // }
  return accounts;
}
const initState = Map<string, AdminAccountModel>(initAccountDate());
const AdminAccountStoreFactory = ({state = initState, actions = []}) => {
  const newState = state ? state : initState;
  const filteredAction = actions.filter((x, i, self) => self.indexOf(x) === i);
  return new AdminAccountStore(newState, handler, filteredAction);
}
export default AdminAccountStoreFactory;