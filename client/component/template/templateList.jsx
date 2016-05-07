import React from 'react';
import Template from './templateItem';

class TemplateList extends React.Component {
  render() {
    const templates = this.props.templates;
    const templateList = templates.map(template =>
      <Template key={template.template} template={template} />);
    return (
      <ul>
        {templateList}
      </ul>
    );
  }
}

TemplateList.propTypes = {
  templates: React.PropTypes.any,
};

export default TemplateList;
