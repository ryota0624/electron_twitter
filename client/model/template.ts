import { Record } from 'immutable';
const inputToken = '*';
export class TemplateModel extends Record({
  template: '',
  input: '',
}) {
  text: string;
  template: string;
  input: string;
  setInput(input) {
    return this.setPramas({ input });
  }
  setTemplate(template) {
    return this.setPramas({ template });
  }
  setPramas(params) {
    const newParams = Object.assign({}, this.toJS(), params);
    return new TemplateModel(newParams);
  }
  getText() {
    const prevText = this.template;
    const nextText = this.template.replace(inputToken, this.input);
    if (prevText != nextText) {
      const nextTemplate = this.setTemplate(nextText);
      return nextTemplate.getText();
    } else {
      return nextText;
    }
  }
}