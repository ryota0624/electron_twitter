import React from 'react';
import TweetList from './tweetList';
import { AdminAccountModel } from '../../model/user';
import { TweetModel } from '../../model/tweet';

import PostForm from './postForm';
import { postTweet } from '../../action/tweet';

const accountComponent = (props, click) => {
  const { name, screen_name ,profile_image_url } = props;
  return (
    <div className={"uk-block-muted"}>
      <img src={profile_image_url} alt={'hoge'} />
      <strong>{name}</strong>
      <span>{screen_name}</span>
      <PostForm onClickPost={click} />
    </div>
  );
};

class AccountTimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.tweetPost = this.tweetPost.bind(this);
  }
  tweetPost(text) {
    const tweet = new TweetModel({ text });
    postTweet(this.props.account.id_str, tweet);
  }
  render() {
    const { tweetItems, account } = this.props;
    return (
      <div className="uk-block">
        <div className="uk-container">
          {accountComponent(account, this.tweetPost)}
          <TweetList
            tweetItems={tweetItems}
            fetchAccount={this.props.fetchAccount}
            getTweetById={this.props.getTweetById}
          />
        </div>
      </div>
    );
  }
}

AccountTimeLine.defaultProps = {
  tweetItems: [],
  account: new AdminAccountModel(),
};

AccountTimeLine.propTypes = {
  tweetItems: React.PropTypes.arrayOf(React.PropTypes.any),
  account: React.PropTypes.any,
  fetchAccount: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
};

export default AccountTimeLine;
