import * as io from 'socket.io-client';
import { addAccount, updateAccount } from '../action/adminAccount';
import { addTweet } from '../action/tweet';
import { addUser } from '../action/user';
var socket = io.connect();
export const socketConnect = () => socket.on('tweet', (data) => {
  const { account, tweet } = data;
  addTweet(tweet.id_str, tweet);
  addUser(tweet.user.id_str, tweet.user);
  updateAccount(account.id, { timeLine: [tweet.id_str] });
});