import { command } from '../flux';
import { ADDTEMPLATE, REMOVETEMPLATE } from '../constant/template'

export function addTemplate(id, template) {
  command(ADDTEMPLATE, { id, template: template.toJS() });
}

export function removeTemplate(template) {
  command(REMOVETEMPLATE, { id: template.template });
}

export function templateCreater(templateDB) {
  const keys = Object.keys(templateDB);
  const templateActions = keys.map(key => templateDB[key]);
  return templateActions;
};