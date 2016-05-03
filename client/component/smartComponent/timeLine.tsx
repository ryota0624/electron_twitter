import * as React from 'react'
import { connect, SmartComponent } from '../../flux';
import { postTweet } from '../../action/tweet';
import { openWindow } from '../../service/ipc';

import AccountTimeLineComponent from '../tweet/account.jsx';
const AccountTimeLine: any = AccountTimeLineComponent;
class TimeLine extends SmartComponent<any, any> {
  constructor(props, context) {
    super(props, context);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.state = {
      account: this.props.account,
      tweet: this.props.tweet,
      user: this.props.user
    }
    this.fetchUser = this.fetchUser.bind(this);
    this.getTweetById = this.getTweetById.bind(this);
    this.goTweetDetail = this.goTweetDetail.bind(this);
  }
  componentDidMount() {
    this.props.tweet.addChangeListener(this.onChangeStore);
    this.props.account.addChangeListener(this.onChangeStore);
    this.props.user.addChangeListener(this.onChangeStore);
  }
  componentWillUnmount() {
    this.props.tweet.removeChangeListener(this.onChangeStore);
    this.props.account.removeChangeListener(this.onChangeStore);
    this.props.user.removeChangeListener(this.onChangeStore);
  }
  onChangeStore() {
    this.setState({
      account: this.props.account,
      tweet: this.props.tweet,
      user: this.props.user
    });
  }
  fetchUser(accountId: string) {
    return this.state.user.getById(accountId);
  }
  getTweetById(tweetId: string) {
    return this.state.tweet.getById(tweetId);
  }
  goTweetDetail(tweetId: string) {
    this.props.router.push(`/tweet/${tweetId}`);
  }
  replayWindow(accountId: string, tweet) {
    const params = JSON.stringify({ accountId, tweetId: tweet.id_str });
    openWindow(`http://localhost:3000/tweet/${params}`);
  }
  postTweet(accountId: string, tweet) {
    postTweet(accountId, tweet);
  }
  subscribe() {
    this.on('openReplayWindow', ({accountId, tweet}) => {
      this.replayWindow(accountId, tweet);
    });
    this.on('goTweetDetail', ({tweetId}) => {
      this.goTweetDetail(tweetId);
    });
    this.on('postTweet', ({accountId, tweet}) => {
      this.postTweet(accountId, tweet);
    })
  }
  render() {
    const accounts = this.state.account.getAllUser();
    const tweetItems = accounts
      .map(account => ({ tweets: this.state.tweet.getAccountTimeLine(account), account })).toArray()
      .map((item, index) => <AccountTimeLine key={index}
        tweetItems={item.tweets}
        account={item.account}
        fetchUser={this.fetchUser}
        getTweetById={this.getTweetById}
        />);
    return (
      <div>
        {tweetItems}
      </div>
    );
  }
}

export default connect(TimeLine);
