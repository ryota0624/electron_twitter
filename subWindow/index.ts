import { TweetModel } from '../client/model/tweet';
import { postTweet } from '../client/action/tweet';
import { AdminAccountModel } from '../client/model/user'

const templateDate = (dataSelector) => {
  if (typeof window === "undefined") return {};
  return JSON.parse(document.getElementById(dataSelector).getAttribute('data-json')); 
}

const createTweetModel = () => {
  return new TweetModel(templateDate('tweet-data'));
}
const createAccountModel = () => {
  return new AdminAccountModel(templateDate('account-data'));
}


const app = () => {
  const account = createAccountModel();
  const tweet = createTweetModel();
  const button = document.getElementById('postBtn');
  button.addEventListener('click', () => {
    const text: HTMLTextAreaElement = document.forms['tweet'].elements['post'].value;
    const baseTweet = new TweetModel({ text });
    const replayTweet = tweet.replay(baseTweet);
    postTweet(account.id_str, replayTweet);
  })
};

app();