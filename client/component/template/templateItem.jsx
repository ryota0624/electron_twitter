import React from 'react';
import { DumpComponent } from '../dumpComponent';
class TemplateItem extends DumpComponent {
  removeTemplate() {
    this.dispatch('removeTemplate', { template: this.props.template });
  }
  render() {
    const template = this.props.template;
    const removeTemplate = this.removeTemplate.bind(this);
    return (
      <li>
        {template.template}
        <button onClick={removeTemplate}>remove</button>
      </li>
    );
  }
}

TemplateItem.propTypes = {
  template: React.PropTypes.any,
};

export default TemplateItem;
