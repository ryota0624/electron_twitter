import React from 'react';

class TemplateItem extends React.Component {
  render() {
    const template = this.props.template;
    return (
      <li>
        {template.template}
      </li>
    );
  }
}

TemplateItem.propTypes = {
  template: React.PropTypes.any,
};

export default TemplateItem;
