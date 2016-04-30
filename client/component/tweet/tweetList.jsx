import React from 'react';
import TweetItem from './tweetItem';

class TweetList extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  itemToComponent(tweetItems) {
    return tweetItems.map(tweet => {
      const { text } = tweet;
      return (
        <TweetItem text={text} />
      );
    });
  }
  render() {
    const tweetComponents = this.itemToComponent(this.props.tweetItems);
    return (
      <ul className="uk-list">
        {tweetComponents}
      </ul>
    );
  }
}

TweetList.defaultProps = { tweetItems: [] };
TweetList.propTypes = {
  tweetItems: React.PropTypes.arrayOf(React.PropTypes.any),
};

export default TweetList;
