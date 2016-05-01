import React from 'react';

class TweetItem extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  render() {
    const { fetchAccount, tweet } = this.props;
    const account = fetchAccount(tweet.id_str);
    return (
      <ul>
        <div className="uk-panel uk-panel-box">
          <h3 className="uk-panel-title">{JSON.stringify(account)}</h3>
          {JSON.stringify(this.props.tweet.text)}
        </div>
      </ul>
    );
  }
}

TweetItem.propTypes = {
  tweet: React.PropTypes.any,
  fetchAccount: React.PropTypes.any,
};
export default TweetItem;
