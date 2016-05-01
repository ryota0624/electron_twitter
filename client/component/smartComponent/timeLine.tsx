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
      tweet: this.props.tweet
    }
    this.fetchAccount = this.fetchAccount.bind(this);
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
  fetchAccount(accountId: string) {
    return this.state.account.getById(accountId);
  }
  render() {
    const accounts = this.state.account.getAllUser();
    const tweetItems = accounts
      .map(account => ({ tweets: this.state.tweet.getAccountTimeLine(account), account })).toArray()
      .map((item, index) => <AccountTimeLine key={index} tweetItems={item.tweets} account={item.account} fetchAccount={this.fetchAccount}/>);
    return (
      <div>
        {tweetItems}
      </div>
    );
  }
}

export default connect(TimeLine);
