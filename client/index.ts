import { StoreContainer } from './flux';
import AdminAccountStoreFactory from './store/adminAccount';
import tweetStoreFactory from './store/tweet';
import UserStoreFactory from './store/user';
import DeleteTweetStoreFactory from './store/deleteTweet';
import TemplateStoreFactory from './store/template';


import { socketConnect } from './service/socket';
import db from './mainStore';
import * as accountAction from './action/adminAccount';
import * as tweetAction from './action/tweet';
import * as userAction from './action/user';
import * as templateAction from './action/template';


import { render } from 'react-dom';
import { app } from './component/router';

const appInit = async () => {
  const accountDB = await db.load('account');
  const tweetDB = await db.load('tweet');
  const templateDB = await db.load('template');

  
  const tweetActions = tweetAction.addActionCreater(tweetDB);
  const userActions = userAction.addActionCreator(tweetDB);
  const accountActions = []
    .concat(accountAction.addActionCreater(accountDB), accountAction.updateActionCreater(tweetDB));
  const templateActions = templateAction.templateCreater(templateDB);
  
  const tweetStore = tweetStoreFactory({ actions: tweetActions });
  const accountStore = AdminAccountStoreFactory({ actions: accountActions });
  const userStore = UserStoreFactory({ actions: userActions });
  const templateStore = TemplateStoreFactory({ actions: templateActions });
  const deleteTweetStore = DeleteTweetStoreFactory({});
  
  templateStore.addChangeListener(() => {
    const lastAction = templateStore.lastAction
    db.save('template', lastAction.id, lastAction);
  });
  
  const storeContainer = new StoreContainer({
    tweet: tweetStore, account: accountStore, user: userStore,
    template: templateStore, deleted: deleteTweetStore
  });
    
  socketConnect();
  render(app(storeContainer), document.getElementById('app'));
}
appInit();
