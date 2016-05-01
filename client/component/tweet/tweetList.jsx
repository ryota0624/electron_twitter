import React from 'react';
import TweetItem from './tweetItem';

class TweetList extends React.Component {
  itemToComponent(tweetItems) {
    return tweetItems.map(tweet => {
      const { id_str } = tweet;
      return (
        <TweetItem
          tweet={tweet}
          key={id_str}
          getTweetById={this.props.getTweetById}
          fetchAccount={this.props.fetchAccount}
        />
      );
    });
  }
  render() {
    const tweetComponents = this.itemToComponent(this.props.tweetItems);
    return (
      <ul className="uk-list uk-list-line">
        {tweetComponents}
      </ul>
    );
  }
}

TweetList.defaultProps = {
  tweetItems: [],
};
TweetList.propTypes = {
  tweetItems: React.PropTypes.arrayOf(React.PropTypes.any),
  fetchAccount: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
};

export default TweetList;
