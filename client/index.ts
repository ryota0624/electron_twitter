import { storeInit } from './storeContainer';
import { render } from 'react-dom';
import { app } from './component/router';
import { socketConnect } from './service/socket';
import db from './mainStore';
import { ActionDatabase, LocalStoregeDatabase } from './database/localhost';

const appInit = async () => {
  const dba = await db.load('account');
  console.log(dba)
  const tweetDB = new ActionDatabase('tweet', new LocalStoregeDatabase());
  await tweetDB.init();
  const tweetActions = await tweetDB.load();
  
  const accountDB = new ActionDatabase('account', new LocalStoregeDatabase());
  await accountDB.init();
  const accountActions = await accountDB.load();

  const userDB = new ActionDatabase('user', new LocalStoregeDatabase());
  await userDB.init();
  const userActions = await userDB.load();
  console.log(storeInit)
  const storeContainer = await storeInit({ tweetActions: [] });
  console.log(storeContainer)

  const { tweet, account, user} = storeContainer.stores;
  tweet.addChangeListener(() => {
    tweetDB.add(tweet.lastAction);
    tweetDB.commit();
  });

  account.addChangeListener(() => {
    accountDB.add(account.lastAction);
    accountDB.commit();
  });

  user.addChangeListener(() => {
    userDB.add(user.lastAction);
    userDB.commit();
  });
  socketConnect();
  render(app(storeContainer), document.getElementById('app'));
}
appInit();