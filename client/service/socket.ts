import * as io from 'socket.io-client';
import { addAccount, updateAccount } from '../action/adminAccount';
import { addTweet } from '../action/tweet';
var socket = io.connect();
export const socketConnect = () => socket.on('tweet', (data) => {
  const { account, tweet } = data;
  addTweet(tweet.id, tweet);
  updateAccount(account.id, { timeLine: [tweet.id_str] })
});