import { command } from '../flux';
import { ADDUSER } from '../constant/user';
export const addUser = (id, user) => {
  command(ADDUSER, { user, id });
}

export function addActionCreator(tweetDB) {
  const keys = Object.keys(tweetDB);
  const actions = keys.map(key => {
    return {
      type: ADDUSER,
      user: tweetDB[key].user,
      id: tweetDB[key].user.id_str
    }
  })
  return actions;
}