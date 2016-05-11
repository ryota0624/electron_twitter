const assert = require('power-assert');
const db = require('../../server/db/db');
describe('db.spec', () => {
  describe('db mocktest', () => {
    const mockDb = {
      init() {
        return 'init';
      },
      save() {
        return 'save';
      },
      load() {
        return 'load';
      },
      destroy() {
        return 'destory';
      },
    };
    const mockDbNames = ['test'];
    const database = new db.Db(mockDb, mockDbNames);
    it('databaseInstance have dbNames', () => assert.equal(database.dbNames, mockDbNames));
    it('databaseInstance have adaptor', () => assert.deepEqual(database.adaptor, mockDb));
    it('database method return adaptor  method', () => {
      assert.equal(database.init(), mockDb.init());
      assert.equal(database.save(), mockDb.save());
      assert.equal(database.load(), mockDb.load());
      assert.equal(database.destroy(), mockDb.destroy());
    });
  });
});

describe('fileDatabase', () => {
  const fileDatabase = new db.FileDb([__dirname]);
  describe('properties', () => {
    it('filename', () => assert.deepEqual(fileDatabase.filePath, [__dirname]));
  });
  describe('method', () => {
    it('[if] ファイルネームに即したものが存在しなければ生成', () => {
      fileDatabase.init(['/test.data']).then(() => assert());
    });
  });
});
