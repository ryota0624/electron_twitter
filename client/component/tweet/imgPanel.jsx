import React from 'react';

const imgStype = {
  display: 'inline-block',
  border: '1px solid #ccc',
  padding: '5px 10px',
  // textAlign: 'center',
};

class ImgPanel extends React.Component {
  onClickImg() {
    return 8;
  }
  render() {
    const { media, onClick } = this.props;
    const imgUrl = media.getUrl();
    return (
      <div style={imgStype} className="uk-panel uk-panel-box">
        <img
          className="uk-border-rounded"
          onClick={onClick}
          width={150} height={150}
          src={imgUrl} alt={imgUrl}
        />
      </div>
    );
  }
}
ImgPanel.propTypes = {
  media: React.PropTypes.any,
  onClick: React.PropTypes.any,
};

export default ImgPanel;
