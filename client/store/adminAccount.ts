import Store from '../flux';
import { Map } from 'immutable';
import { ADDACCOUNT, UPDATE } from '../constant/adminAccount';
import { AdminAccountModel } from '../model/user';

interface accountCollectionn extends Map<string, AdminAccountModel>{}

export function handler(action: any, state: accountCollectionn): accountCollectionn {
  switch (action.type) {
    case ADDACCOUNT: {
      return state.set(action.id, new AdminAccountModel(action.account));
    };
    case UPDATE: {
      const updateAccount = state.get(action.id);
      return updateAccount ? state.set(action.id, updateAccount.update(action.params)): state;
    }
  }
  return state;
}

export class AdminAccountStore extends Store<accountCollectionn> {
  getById(id: string) {
    return this.state.get(id);
  }
}

const initAccounts = () => {
  if (typeof window === "undefined") return {};
  const accountJSON = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
  const keys = Object.keys(accountJSON);
  const accounts = {};
  for (let i of keys) {
    const account = JSON.parse(accountJSON[i]._raw);
    accounts[i] = new AdminAccountModel(account);
  }
  return accounts;
}
const initState = Map<string, AdminAccountModel>(initAccounts());
const AdminAccountStoreFactory = ({state = initState, actions = []}) => {
  const newState = state ? state : initState;
  return new AdminAccountStore(newState, handler, actions);
}
export default AdminAccountStoreFactory;