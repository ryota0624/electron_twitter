import React from 'react';
import { DumpComponent } from '../dumpComponent';
import TweetList from './tweetList';
import PostForm from './postForm';

import { AdminAccountModel } from '../../model/user';
import { TweetModel } from '../../model/tweet';

const accountComponent = (params, click) => {
  const { name, screen_name, profile_image_url } = params;
  return (
    <div className={"uk-block uk-block-muted"}>
      <div className="uk-container">
        <img src={profile_image_url} alt={'hoge'} />
        <strong>{name}</strong>
        <span>{screen_name}</span>
        <PostForm onClickPost={click} />
      </div>
    </div>
  );
};

class AccountTimeLine extends DumpComponent {
  constructor(props, context) {
    super(props, context);
    this.tweetPost = this.tweetPost.bind(this);
  }
  tweetPost(text) {
    const tweet = new TweetModel({ text });
    this.dispatch('postTweet', { accountId: this.props.account.id_str, tweet });
  }
  componentDidMount() {
    this.dispatch('hoge', 9);
  }
  render() {
    const { tweetItems, account, className } = this.props;
    return (
      <div className={`uk-block ${className}`}>
        <div className="uk-container">
          {accountComponent(account, this.tweetPost)}
          <TweetList
            tweetItems={tweetItems}
            fetchUser={this.props.fetchUser}
            getTweetById={this.props.getTweetById}
            account={account}
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
  fetchUser: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
  className: React.PropTypes.any,
};

export default AccountTimeLine;
