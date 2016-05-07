import React from 'react';
import { TemplateModel } from '../../model/template';
import { DumpComponent } from '../dumpComponent';
class TemplateForm extends DumpComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      template: new TemplateModel(),
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeTemplate = this.onChangeTemplate.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }
  onChangeTemplate(e) {
    const { template } = this.state;
    this.setState({ template: template.setTemplate(e.target.value) });
  }
  onChangeInput(e) {
    const { template } = this.state;
    this.setState({ template: template.setInput(e.target.value) });
  }
  onClickButton() {
    const template = this.state.template;
    this.dispatch('addTemplate', { id: template.template, template });
  }
  render() {
    return (
      <div>
        {/* input<input name="input" onChange={this.onChangeInput} />*/}
        template<input name="template" onChange={this.onChangeTemplate} />
        <button onClick={this.onClickButton}>add</button>
      </div>
    );
  }
}

TemplateForm.propTypes = {
  template: React.PropTypes.any,
};

export default TemplateForm;
