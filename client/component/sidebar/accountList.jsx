import React from 'react';
import { DumpComponent } from '../dumpComponent';
import Account from './account';
class AccountList extends DumpComponent {
  render() {
    const accountList = this.props.accountList
      .map(account => <Account key={account.id_str} account={account} />);
    return (
      <div>
        <ul className="uk-list  uk-list-space">
          {accountList}
          <li key="addAccount">
            <div>
              <i className="uk-icon-plus uk-icon-large" />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

AccountList.propTypes = {
  accountList: React.PropTypes.any,
};

export default AccountList;
