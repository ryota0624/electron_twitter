import React from 'react';
import TweetItem from './tweetItem';
import { DumpComponent } from '../dumpComponent';

const listStyle = {
  width: '100%',
  margin: '0 auto',
  whiteSpace: 'nowrap',
  overflowX: 'scroll',
  overflowY: 'scroll',
  height: '500px',
};

class TweetList extends DumpComponent {
  itemToComponent(tweetItems) {
    return tweetItems.map(tweet => {
      const { id_str } = tweet;
      return (
        <TweetItem
          tweet={tweet}
          key={id_str}
          getTweetById={this.props.getTweetById}
          fetchUser={this.props.fetchUser}
          goTweetDetail={this.props.goTweetDetail}
          replay={this.props.replay}
          account={this.props.account}
        />
      );
    });
  }
  render() {
    const tweetComponents = this.itemToComponent(this.props.tweetItems);
    return (
      <div style={listStyle}>
        <ul className="uk-list uk-list-line">
          {tweetComponents}
        </ul>
      </div>
    );
  }
}

TweetList.defaultProps = {
  tweetItems: [],
};
TweetList.propTypes = {
  tweetItems: React.PropTypes.arrayOf(React.PropTypes.any),
  fetchUser: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
  goTweetDetail: React.PropTypes.any,
  replay: React.PropTypes.any,
  account: React.PropTypes.any,
};

export default TweetList;
