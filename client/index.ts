import { StoreContainer } from './flux';
import AdminAccountStoreFactory from './store/adminAccount';
import tweetStoreFactory from './store/tweet';
import { socketConnect } from './service/socket';
import * as twAction from './action/tweet';
import { TweetModel } from './model/tweet';
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
  let accountOldActions = await accountDB.load();
  const accountStore = AdminAccountStoreFactory({ actions: accountOldActions });
  const storeContainer = new StoreContainer({ tweet: tweetStore, account: accountStore });
  
  tweetStore.addChangeListener(() => {
    tweetDB.add(tweetStore.lastAction);
    tweetDB.commit();
  });

  accountStore.addChangeListener(() => {
    console.log(accountStore.lastAction);
    accountDB.add(accountStore.lastAction);
    accountDB.commit();
  })
  
  socketConnect();
  render(app(storeContainer), document.getElementById('app'));
}
appInit();




// const status = new TweetModel({ text: new Date() });
// // twAction.postTweet('2979592160', status).then(st => {
// //   const repStatus = new TweetModel(st);
// //   console.log(repStatus.replay(status).post());
// //   twAction.postTweet('2979592160', repStatus.replay(status))
// //     .then(res => {
// //       console.log(res);
// //       return res;
// //     }).then(rpst => {
// //       // twAction.destroyTweet('2979592160', repStatus);
// //       // twAction.destroyTweet('2979592160', new TweetModel(rpst));
// //     })
// //   // twAction.destroyTweet('2979592160', repStatus).then(res => console.log(res));
// // });