import * as React from 'react';
import { connect, SmartComponent } from '../../flux';
import { addTemplate, removeTemplate } from '../../action/template';
import TemplateFormComponent from '../template/templateForm';
import TemplateListComponent from '../template/templateList';
const TemplateForm: any = TemplateFormComponent;
const TemplateList: any = TemplateListComponent;

class TemplatePage extends SmartComponent<any, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      templates: this.props.template.getAllTemplate(),
    };
    this.onChangeStore = this.onChangeStore.bind(this);
  }
  addTemplate(id, template) {
    addTemplate(id, template);
  }
  removeTemplate(template) {
    removeTemplate(template);
  }
  onChangeStore() {
    this.setState({ templates: this.props.template.getAllTemplate() });
  }
  componentDidMount() {
    this.props.template.addChangeListener(this.onChangeStore);
  }
  componentWillUnmount() {
    this.props.template.removeChangeListener(this.onChangeStore);
  }
  subscribe() {
    this.on('addTemplate', ({ id, template }) => {
      this.addTemplate(id, template);
    });
    this.on('removeTemplate', ({ template }) => {
      this.removeTemplate(template);
    });
  }
  render() {
    return (
      <div>
        <TemplateForm />
        <TemplateList templates={this.state.templates} />
      </div>
    );
  }
}

export default connect(TemplatePage);
