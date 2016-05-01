import React from 'react';
import { TweetModel } from '../../model/tweet';
import { UserModel } from '../../model/user';

class TweetItem extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  renderRetweet(tweet) {
    const retweetId = tweet.retweeted ? tweet.retweeted_status.id_str : null;
    if (!retweetId) return null;
    const { getTweetById, fetchAccount } = this.props;
    const retweet = getTweetById(retweetId);
    return (
      <ul>
        <TweetItem
          tweet={retweet}
          getTweetById={getTweetById}
          fetchAccount={fetchAccount}
        />
      </ul>);
  }
  render() {
    const { fetchAccount, tweet } = this.props;
    let account = fetchAccount(tweet.user.id_str);
    account = account instanceof UserModel ? account : new UserModel();
    const retweetComponent = this.renderRetweet.bind(this)(tweet);
    return (
      <li>
        <div className="uk-panel">
          <h3 className="uk-panel-title">
            <img src={account.profile_image_url} alt={'hoge'} />
            {account.name}
          </h3>
          <div>{this.props.tweet.text}</div>
          {retweetComponent}
          <div>fav</div>
        </div>
      </li>
    );
  }
}

TweetItem.propTypes = {
  tweet: React.PropTypes.any,
  fetchAccount: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
};
TweetItem.defaultProps = {
  tweet: new TweetModel(),
};
export default TweetItem;
