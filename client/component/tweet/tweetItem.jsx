import React from 'react';
import { TweetModel } from '../../model/tweet';
import ImgPanel, { listStyle } from './imgPanel';

class TweetItem extends React.Component {
  shouldUpdateComponent() {
    return true;
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
          <div>replay </div>
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
};
TweetItem.defaultProps = {
  tweet: new TweetModel(),
};



export default TweetItem;
