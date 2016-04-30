import React from 'react';
import TweetItem from './tweetItem';

class TweetList extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  itemToComponent(tweetItems) {
    return tweetItems.map(tweet => {
      const { text, id_str } = tweet;
      return (
        <TweetItem text={text} key={id_str} />
      );
    });
  }
  render() {
    const tweetComponents = this.itemToComponent(this.props.tweetItems);
    return (
      <ul className="uk-list-line">
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
