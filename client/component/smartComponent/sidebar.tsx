import * as React from 'react';
import { connect, SmartComponent } from '../../flux';
import AccountListComponent from '../sidebar/accountList';
const AccountList: any = AccountListComponent;
class Sidebar extends SmartComponent<any, any>{
  render() {
    const accountStore = this.props.account;
    const accoutList = accountStore.getAllUser().toArray();
    return (
      <div className="uk-block-primary">
        <div>
          <AccountList accountList={accoutList} />
        </div>
      </div>
    );
  }
}

export default connect(Sidebar);