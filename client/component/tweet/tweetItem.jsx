import React from 'react';
import { TweetModel } from '../../model/tweet';
import ImgPanel, { listStyle } from './imgPanel';
import { DumpComponent } from '../dumpComponent';

class TweetItem extends DumpComponent {
  constructor(props, context) {
    super(props, context);
    this.replay = this.replay.bind(this);
  }
  shouldUpdateComponent() {
    return true;
  }
  goTweetDetail() {
    this.dispatch('goTweetDetail', { tweetId: this.props.tweet.id_str });
  }
  replay(tweet) {
    return () => {
      const { account } = this.props;
      this.dispatch('openReplayWindow', { accountId: account.id_str, tweet });
    };
  }
  retweet({ tweet, fetchUser, getTweetById, userId }) {
    const retweetId = tweet.id_str;
    const retweet = getTweetById(retweetId);
    const retweetUser = fetchUser(userId);
    return (
      <li>
        RT by {retweetUser.name}
        <ul>
          {this.renderTweet({ tweet: retweet, fetchUser })}
        </ul>
      </li>
    );
  }
  tweet({ tweet, fetchUser }) {
    return this.renderTweet({ tweet, fetchUser });
  }
  renderTweet({ tweet, fetchUser }) {
    if (!tweet) {
      return null;
    }
    const openReplayWindow = this.replay(tweet);
    const account = fetchUser(tweet.user.id_str);
    const imgPanels = tweet.getMedia().map((media, i) => <ImgPanel key={i} media={media} />);
    return (
      <li>
        <div className="uk-panel">
          <h3 className="uk-panel-title">
            <img src={account.profile_image_url} alt={'hoge'} />
            {account.name}
          </h3>
          <div>{this.props.tweet.text}</div>
          <div onClick={openReplayWindow}>replay </div>
          <ul style={listStyle}>
            {imgPanels}
          </ul>
        </div>
      </li>
    );
  }
  render() {
    const { fetchUser, tweet, getTweetById } = this.props;
    const tweetComponent = tweet.retweeted() ?
      this.retweet({
        userId: tweet.user.id_str,
        fetchUser,
        tweet: tweet.retweeted_status,
        getTweetById,
      })
      : this.tweet({ fetchUser, tweet });
    return tweetComponent;
  }
}

TweetItem.propTypes = {
  tweet: React.PropTypes.any,
  fetchUser: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
  goTweetDetail: React.PropTypes.any,
  replay: React.PropTypes.any,
  account: React.PropTypes.any,
};
TweetItem.defaultProps = {
  tweet: new TweetModel(),
};



export default TweetItem;
