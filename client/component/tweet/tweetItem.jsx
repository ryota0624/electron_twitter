import React from 'react';

class TweetItem extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  render() {
    return (
      <ul>
        <div className="uk-panel uk-panel-box">
          <h3 className="uk-panel-title">...</h3>
          {this.props.text}
        </div>
      </ul>
    );
  }
}

TweetItem.propTypes = {
  text: React.PropTypes.string,
};
export default TweetItem;
