import flux from './flux';
import adminStore from './store/adminAccount';
import tweetStore from './store/tweet';
import { socketConnect } from './service/socket';
import * as twAction from './action/tweet';
import { TweetModel } from './model/tweet';
tweetStore.addChangeListener(() => console.log(tweetStore.get().toJS()));
adminStore.addChangeListener(() => console.log(adminStore.get().toJS()));

socketConnect();
const status = new TweetModel({ text: new Date() });
twAction.postTweet('2979592160', status).then(st => {
  const repStatus = new TweetModel(st);
  console.log(repStatus.replay(status).post());
  twAction.postTweet('2979592160', repStatus.replay(status))
    .then(res => {
      console.log(res);
      return res;
    }).then(rpst => {
      // twAction.destroyTweet('2979592160', repStatus);
      // twAction.destroyTweet('2979592160', new TweetModel(rpst));
    })
  // twAction.destroyTweet('2979592160', repStatus).then(res => console.log(res));
});