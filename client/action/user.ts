import { command } from '../flux';
import { ADDUSER } from '../constant/user';
export const addUser = (id, user) => {
  command(ADDUSER, { user, id });
}