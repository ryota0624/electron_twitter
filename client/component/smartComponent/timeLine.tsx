import * as React from 'react'
import { connect } from '../../flux';
import TweetList from '../tweet/tweetList.jsx';

class TimeLine extends React.Component<any, any> {
  render() {
    const tweetList = this.props.storeContainer.getStore('tweet').getAllTweet();
    console.log(tweetList)
    return null
  }
}

export default connect(TimeLine);
