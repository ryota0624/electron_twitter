import { ADDACCOUNT, UPDATE } from '../constant/adminAccount';
import { command } from '../flux';

export function addAccount(id, account) {
  command(ADDACCOUNT, { id, account });
}
export function updateAccount(id, params) {
  command(UPDATE, { id, params });
}

export const addActionCreater = (accountDB) => {
  const keys = Object.keys(accountDB);
  const actions = keys.map(key => {
    return {
      type: ADDACCOUNT,
      id: accountDB[key].id_str,
      account: accountDB[key],
    }
  });
  return actions;
}

export function updateActionCreater(tweetDB) {
  const keys = Object.keys(tweetDB);
  const tweetActions = keys.map(key => {
    return {
      type: UPDATE,
      id: tweetDB[key].reseivedAccount.id_str,
      params: {
        timeLine: [tweetDB[key].id_str],
      },
    }
  });
  return tweetActions;
}