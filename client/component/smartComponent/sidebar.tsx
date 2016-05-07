import * as React from 'react';
import { connect, SmartComponent } from '../../flux';
import AccountListComponent from '../sidebar/accountList';
import { Link } from 'react-router';
const AccountList: any = AccountListComponent;
class Sidebar extends SmartComponent<any, any>{
  render() {
    const accountStore = this.props.account;
    const accoutList = accountStore.getAllUser().toArray();
    return (
      <div className="uk-block-primary">
        <Link to="/template">template</Link>
        <Link to="/">timeLine</Link>
        <div>
          <AccountList accountList={accoutList} />
        </div>
      </div>
    );
  }
}

export default connect(Sidebar);