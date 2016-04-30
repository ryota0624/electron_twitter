import * as React from 'react'
import { connect } from '../../flux';
import TweetListComponent from '../tweet/tweetList.jsx';
const TweetList: any = TweetListComponent;
class TimeLine extends React.Component<any, any> {
  tweetStore: any;
  constructor(props) {
    super(props);
    this.tweetStore = this.props.tweetStore;
    this.onChangeStore = this.onChangeStore.bind(this);
    // this.tweetStore.addChangeListener(this.onChangeStore);
  }
  onChangeStore() {
  }
  render() {
    const tweetItems = this.props.tweet.getAllTweet();
    return React.createElement(TweetList, { tweetItems });
  }
}

export default connect(TimeLine);
