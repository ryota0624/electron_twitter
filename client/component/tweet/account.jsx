import React from 'react';
import { DumpComponent } from '../dumpComponent';
import TweetList from './tweetList';
import PostForm from './postForm';

import { AdminAccountModel } from '../../model/user';
import { TweetModel } from '../../model/tweet';

const accountComponent = (params, click) => {
  const { name, screen_name, profile_image_url } = params.account;
  return (
    <div className={"uk-block-muted"}>
      <div className="uk-container">
        <img className="uk-border-rounded" src={profile_image_url} alt={'hoge'} />
        <strong>{name}</strong>
        <span>{screen_name}</span>
        <PostForm onClickPost={click} getTemplate={params.getTemplate} />
      </div>
    </div>
  );
};

class AccountTimeLine extends DumpComponent {
  constructor(props, context) {
    super(props, context);
    this.tweetPost = this.tweetPost.bind(this);
    this.state = {
      timeLine: 15,
    };
  }
  tweetPost(text) {
    const tweet = new TweetModel({ text });
    this.dispatch('postTweet', { accountId: this.props.account.id_str, tweet });
  }
  onScroll() {
    this.setState({ timeLine: this.state.timeLine + 5 });
  }
  render() {
    const { getAccountTimeLine, account, className } = this.props;
    const tweetItems = getAccountTimeLine(account, { num: this.state.timeLine });
    const onScroll = this.onScroll.bind(this);
    const timeLineOpen = this.props.account.timeLineOpen;
    return (
      <div className={`${className}`} hidden={!timeLineOpen}>
        <div className="uk-container">
          {accountComponent({ account, getTemplate: this.props.getTemplate }, this.tweetPost)}
          <TweetList
            tweetItems={tweetItems}
            fetchUser={this.props.fetchUser}
            getTweetById={this.props.getTweetById}
            account={account}
            onScroll={onScroll}
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
  getAccountTimeLine: React.PropTypes.any,
  account: React.PropTypes.any,
  fetchUser: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
  className: React.PropTypes.any,
  getTemplate: React.PropTypes.any,
};

export default AccountTimeLine;
