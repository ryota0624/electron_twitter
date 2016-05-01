import * as React from 'react'
import { connect } from '../../flux';
import AccountTimeLineComponent from '../tweet/account.jsx';
const AccountTimeLine: any = AccountTimeLineComponent;
class TimeLine extends React.Component<any, any> {
  tweetStore: any;
  constructor(props) {
    super(props);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.state = {
      account: this.props.account,
      tweet: this.props.tweet,
      user: this.props.user
    }
    this.fetchAccount = this.fetchAccount.bind(this);
    this.getTweetById = this.getTweetById.bind(this);
  }
  componentDidMount() {
    this.props.tweet.addChangeListener(this.onChangeStore);
    this.props.account.addChangeListener(this.onChangeStore);
    this.props.user.addChangeListener(this.onChangeStore);
  }
  onChangeStore() {
    this.setState({
      account: this.props.account,
      tweet: this.props.tweet,
      user: this.props.user
    });
  }
  fetchAccount(accountId: string) {
    return this.state.user.getById(accountId);
  }
  getTweetById(tweetId: string) {
    return this.state.tweet.getById(tweetId);
  }
  render() {
    const accounts = this.state.account.getAllUser();
    const tweetItems = accounts
      .map(account => ({ tweets: this.state.tweet.getAccountTimeLine(account), account })).toArray()
      .map((item, index) => <AccountTimeLine key={index}
        tweetItems={item.tweets}
        account={item.account}
        fetchAccount={this.fetchAccount}
        getTweetById={this.getTweetById}
        />);
    return (
      <div>
        {tweetItems}
      </div>
    );
  }
}

export default connect(TimeLine);
