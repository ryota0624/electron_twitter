import { StoreContainer } from './flux';
import AdminAccountStoreFactory from './store/adminAccount';
import tweetStoreFactory from './store/tweet';
import UserStoreFactory from './store/user';
import { socketConnect } from './service/socket';
import { ActionDatabase, LocalStoregeDatabase } from './database/localhost';
import { render } from 'react-dom';
import { app } from './component/router';

const appInit = async () => {
  const tweetDB = new ActionDatabase('tweet', new LocalStoregeDatabase());
  await tweetDB.init();
  const tweetOldActions = await tweetDB.load();
  const tweetStore = tweetStoreFactory({ actions: tweetOldActions });
  
  const accountDB = new ActionDatabase('account', new LocalStoregeDatabase());
  await accountDB.init();
  const accountOldActions = await accountDB.load();
  const accountStore = AdminAccountStoreFactory({ actions: accountOldActions });

  const userDB = new ActionDatabase('user', new LocalStoregeDatabase());
  await userDB.init();
  const userOldActions = await userDB.load();
  const userStore = UserStoreFactory({ actions:userOldActions });
  
  const storeContainer = new StoreContainer({ tweet: tweetStore, account: accountStore, user: userStore });
  
  tweetStore.addChangeListener(() => {
    tweetDB.add(tweetStore.lastAction);
    tweetDB.commit();
  });

  accountStore.addChangeListener(() => {
    accountDB.add(accountStore.lastAction);
    accountDB.commit();
  });

  userStore.addChangeListener(() => {
    console.log(userStore.lastAction);
    userDB.add(userStore.lastAction);
    userDB.commit();
  });
  
  socketConnect();
  render(app(storeContainer), document.getElementById('app'));
}
appInit();
