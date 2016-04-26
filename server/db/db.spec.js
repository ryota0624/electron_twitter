const db = require('./db');
const fileDb = new db.FileDb('./');
const database = new db.Db(fileDb, ['test.text', 'hoge']);
database.init().then(() => {
  database.save('test.text', 'hoge', { hoge: 9 });
  return database.save('test.text', 'hoga', { hoge: 0 });
}).then(() => database.load('test.text')).then((file) => console.log(file)).then(() => {
  database.destory('test.text');
});
