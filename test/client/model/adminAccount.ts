import { AdminAccountModel } from '../../../client/model/user';
import * as assert from 'power-assert';

describe('adminAccount', () => {
  it('admin hava timeLineArr', () => {
    const newAccount = new AdminAccountModel();
    // assert(newAccount.timeLine);
    const updatedAccount = newAccount.updateTimeLine({ timeLine: [1, 2, 4] });
    // assert.notDeepEqual(updatedAccount, newAccount);
    // assert.equal(updatedAccount.timeLine.length, 3)
    const updated2Account = updatedAccount.updateTimeLine({ timeLine: [1] });
    assert.equal(updated2Account.timeLine.length, 3)
    const updated3Account = updated2Account.updateTimeLine({ timeLine: [1] });
    assert.equal(updated3Account.timeLine.length, 3)
    
  })
})