import { CollectionStore, Collection } from '../flux';
import { TemplateModel } from '../model/template';
import { ADDTEMPLATE, REMOVETEMPLATE } from '../constant/template';

export function handler(action, state: Collection<TemplateModel>) :Collection<TemplateModel> {
  switch (action.type) {
    case ADDTEMPLATE: {
      return state.set(action.id, new TemplateModel(action.template));
    }
    case REMOVETEMPLATE: {
      return state.remove(action.id);
    }
  }
  return state;
}

export class TemplateStore extends CollectionStore<TemplateModel> {
  getAllTemplate() {
    return this.state.toArray();
  }
  getTemplate(template: string) {
    if(template.length <= 0) return []
    return this.state.filter(templateModel => templateModel.template.match(template) ? true : false).toArray();
  }
}

export function TemplateStoreFactory(params) {
  const { actions, state } = params;
  return new TemplateStore(handler, actions, state);
}

export default TemplateStoreFactory;