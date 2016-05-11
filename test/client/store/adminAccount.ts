import * as assert from 'power-assert';
import { Map, Record, is } from 'immutable';

import { AdminAccountStore, handler } from '../../../client/store/adminAccount';
import { AdminAccountModel, UserModel } from '../../../client/model/user';
import {  TweetModel } from '../../../client/model/tweet';

import { sample } from '../../../client/store/sampleTweet';

import { ADDACCOUNT, UPDATE } from '../../../client/constant/adminAccount';
describe('AccountModel', () => {
  const map = Map<any, any>();
  const mockAccount = { id: 'test' }
  const account = new UserModel(mockAccount);
  const acMap = map.set(account.id, account);

  const mockAddAccount = { id: 'test'}
  const adminAccount = new AdminAccountModel(mockAddAccount);
  const adMap = map.set(adminAccount.id, adminAccount);
  
  it('account instance', () => assert(account));
  it('account have a id', () => assert.equal(account.id, mockAccount.id));
  // it('account extends', () => assert(!is(account, adminAccount)))
  // it('Im map', () => assert(!is(acMap, adMap)))

})
describe('AdminAccountModel', () => {
  const mockAccount = { id: 6, id_str: 'test', timeLine: ['1','2','3']}
  const account = new AdminAccountModel(mockAccount);
  it('account have tweetIds',() => assert.deepEqual(account.timeLine, mockAccount.timeLine));
})

describe('adminAccountStoreHandler', () => {
  const mockAccountP = { id: 6, id_str: 'test', timeLine: [1, 2, 3] };
  const initState = Map<string, AdminAccountModel>();
  const mockAccount = new AdminAccountModel(mockAccountP);
  var state;
  it('add account', () => {
    state = handler({ type: ADDACCOUNT, id: 'test', account:  mockAccountP}, initState);
    assert.deepEqual(state.get('test'), mockAccount);
  });
  describe('udpate account', () => {
    it('success update', () => {
      const updatedState = handler({ type: UPDATE, id: 'test', params: { timeLine: [9] } }, state);
      assert.equal(updatedState.get('test').timeLine.length, 4);
    })
    // it('fail update', () => {
    //   const updatedState = handler({ type: UPDATE, id: 't', params: { timeLine: [9] } }, state);
    //   assert.deepEqual(updatedState, state);
    // })
  })
})