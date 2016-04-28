import * as assert from 'power-assert';
import Store, { command } from '../../../client/flux';
describe('Store catch action', () => {
  const mockHandler = (action, state) => {
    if (action.type === 'test') return [].concat(state, [action]);
    return state;
  }
  const store = new Store<Array<any>>([], mockHandler);
  const initialActions = store.getActions();
  it('action dispatch', () => new Promise(res => {
    store.addChangeListener(() => {
      assert.notDeepEqual(store.getActions(), initialActions);
      res(true)
    });
    command('test', {});
  }))
  it('initialAcitions', () => new Promise(res => {
    const mockHandler = (action, state) => {
      if (action.type === '__test__') return [].concat(state, [action]);
        return state;
    }
    const mockActions = [0, 0, 0].map(() => ({ type: '__test__' }));
    const store = new Store<Array<any>>([], mockHandler, mockActions);
    assert.equal(store.getActions().length, 3);
    assert.equal(store.get().length, 3);
    res(true)
  }))
})