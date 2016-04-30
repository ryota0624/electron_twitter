import React from 'react';

class TweetItem extends React.Component {
  shouldUpdateComponent() {
    return true;
  }
  render() {
    return (
      <div className="uk-width-medium-1-2">
        <div className="uk-panel">{this.props.text}</div>
      </div>
    );
  }
}

TweetItem.propTypes = {
  text: React.PropTypes.string,
};
export default TweetItem;
