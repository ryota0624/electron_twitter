import { storeInit } from './storeContainer';
import { render } from 'react-dom';
import { app } from './component/router';
import { socketConnect } from './service/socket';
import db from './mainStore';
import { accountActionCreater } from './action/adminAccount';
const appInit = async () => {
  const accountDB = await db.load('account');
  const accountActions = accountActionCreater(accountDB);
  console.log(accountActions)
  const storeContainer = await storeInit({ accountActions });
  socketConnect();
  render(app(storeContainer), document.getElementById('app'));
}
appInit();
