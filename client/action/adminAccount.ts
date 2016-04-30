import { ADDACCOUNT, UPDATE } from '../constant/adminAccount';
import { command } from '../flux';
export function addAccount(id, account) {
  command(ADDACCOUNT, { id, account });
}
export function updateAccount(id, params) {
  command(UPDATE, { id, params });
}