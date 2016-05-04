import { StoreContainer } from './flux';
import AdminAccountStoreFactory from './store/adminAccount';
import tweetStoreFactory from './store/tweet';
import UserStoreFactory from './store/user';

export const storeInit = async ({ tweetActions = [], accountActions = [], userActions = [] }) => {
  const tweetStore = tweetStoreFactory({ actions: tweetActions });
  const accountStore = AdminAccountStoreFactory({ actions: accountActions });
  const userStore = UserStoreFactory({ actions: userActions });
  const storeContainer = new StoreContainer({ tweet: tweetStore, account: accountStore, user: userStore });
  return storeContainer;
}