import { TemplateModel } from '../../../client/model/template';
import * as assert from 'power-assert';
describe('templateModel', () => {
  it('setters', () => {
    const template = new TemplateModel();
    assert(template);
    const setInput = template.setInput('hoge');
    assert.equal(setInput.input, 'hoge');
    const setTemplate = setInput.setTemplate('suzuki*ryota');
    assert.equal(setTemplate.template, 'suzuki*ryota');
    assert.equal(setTemplate.getText(), 'suzukihogeryota');
  });
  it('nest template', () => {
    const template = new TemplateModel({ template: 'hoge*hoge*', input: 'huga' });
    assert.equal(template.getText(), 'hogehugahogehuga');
  })
});