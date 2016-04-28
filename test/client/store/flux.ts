import * as assert from 'power-assert';
import Store, { command } from '../../../client/flux';
describe('Store catch action', () => {
  const mockHandler = (action, state) => {
    if (action.type === 'test') return [].concat(state, [action]);
    return state;
  }
  const store = new Store<Array<any>>([], mockHandler);
  const initialActions = store.getActions();
  it('action dispatc', () => new Promise(res => {
    store.addChangeListener(() => {
      assert.notDeepEqual(store.getActions(), initialActions);
      res(true)
    });
    command('test', {});
  }))
  it('acition')
})