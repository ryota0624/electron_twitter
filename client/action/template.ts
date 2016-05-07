import { command } from '../flux';
import { ADDTEMPLATE } from '../constant/template'

export function addTemplate(id, template) {
  command(ADDTEMPLATE, { id, template: template.toJS() });
}

export function templateCreater(templateDB) {
  const keys = Object.keys(templateDB);
  const templateActions = keys.map(key => templateDB[key]);
  return templateActions;
};