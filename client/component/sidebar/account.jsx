import { DumpComponent } from '../dumpComponent';
import React from 'react';
class Account extends DumpComponent {
  onToggleTimeLine() {
    this.dispatch('toggleTimeLine', { account: this.props.account });
  }
  render() {
    const { account } = this.props;
    const onToggleTimeLine = this.onToggleTimeLine.bind(this);
    const iconClassName = account.timeLineOpen ? '' : 'uk-overlay-panel uk-icon-lock';
    return (
      <li>
        <div className="uk-container-center" onClick={onToggleTimeLine}>
          <figure className="uk-overlay">
            <img className="uk-border-rounded" src={account.profile_image_url} alt="" />
            <div className={`${iconClassName}`}></div>
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
