import * as React from 'react';
import { connect, SmartComponent } from '../../flux';
import AccountListComponent from '../sidebar/accountList';
import { Link } from 'react-router';
import * as accountActions from '../../action/adminAccount';
const AccountList: any = AccountListComponent;
class Sidebar extends SmartComponent<any, any>{
  subscribe() {
    this.on('toggleTimeLine', ({ account }) => {
      accountActions.toggleTimeLine(account);
    });
  }
  render() {
    const accountStore = this.props.account;
    const accoutList = accountStore.getAllUser().toArray();
    return (
      <div className="uk-block-primary">
        <ul>
          <li><Link to="/template">template</Link></li>
          <li><Link to="/">timeLine</Link></li>
        </ul>
        <div>
          <AccountList accountList={accoutList} />
        </div>
      </div>
    );
  }
}

export default connect(Sidebar);