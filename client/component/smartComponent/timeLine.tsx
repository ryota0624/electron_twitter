import * as React from 'react'
import { connect } from '../../flux';
import TweetListComponent from '../tweet/tweetList.jsx';
const TweetList: any = TweetListComponent;
class TimeLine extends React.Component<any, any> {
  tweetStore: any;
  constructor(props) {
    super(props);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.state = {
      account: this.props.account,
      tweet: this.props.tweet
    }
  }
  componentDidMount() {
    this.props.tweet.addChangeListener(this.onChangeStore);
    this.props.account.addChangeListener(this.onChangeStore);
  }
  onChangeStore() {
    this.setState({
      account: this.props.account,
      tweet: this.props.tweet
    });
  }
  render() {
    const accounts = this.state.account.getAllUser();
    const tweetItems = accounts.map(account => this.state.tweet.getAccountTimeLine(account)).toArray();
    const tweetList = tweetItems.map((item, index) => <TweetList key={index} tweetItems={item} />)
    return (
      <div>
        {tweetList}
        {JSON.stringify(accounts)}
      </div>
    );
  }
}

export default connect(TimeLine);
