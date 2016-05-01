import React from 'react';
import TweetList from './tweetList';
import { AdminAccountModel } from '../../model/user';

class AccountTimeLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tweetItems } = this.props;
    return (
      <div>
        <TweetList tweetItems={tweetItems} fetchAccount={this.props.fetchAccount} />
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
};

export default AccountTimeLine;
