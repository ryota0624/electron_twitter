import flux from './flux';
import adminStore from './store/adminAccount';
import tweetStoreFactory from './store/tweet';
import { socketConnect } from './service/socket';
import * as twAction from './action/tweet';
import { TweetModel } from './model/tweet';
import { ActionDatabase, LocalStoregeDatabase } from './database/localhost';
import { render } from 'react-dom';
import { app } from './component/router';

const appInit = async () => {
  const tweetDB = new ActionDatabase('tweet', new LocalStoregeDatabase());
  console.log(tweetDB)
  await tweetDB.init();
  let oldActions = await tweetDB.load();
  oldActions = oldActions.filter(action => action);
  const tweetStore = tweetStoreFactory({ actions: oldActions });
  console.log(tweetStore.get().toJS())
  // tweetStore.addChangeListener(() => console.log(tweetStore.get().toJS()));
  // tweetStore.addChangeListener(() => {
  //   tweetDB.add(tweetStore.lastAction);
  //   tweetDB.commit();
  // });
  // adminStore.addChangeListener(() => console.log(adminStore.get().toJS()));

  // socketConnect();
  render(app({ tweetStore }), document.getElementById('app'));
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