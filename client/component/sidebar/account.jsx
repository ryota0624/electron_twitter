import { DumpComponent } from '../dumpComponent';
import React from 'react';
class Account extends DumpComponent {
  render() {
    const { account } = this.props;
    return (
      <li>
        <div className="uk-container-center">
          <figure className="uk-overlay">
            <img className="uk-border-rounded" src={account.profile_image_url} alt="" />
            <div className="uk-overlay-panel uk-icon-lock"></div>
          </figure>
        </div>
      </li>
    );
  }
}
Account.propTypes = {
  account: React.PropTypes.any,
};

export default Account;
