const db = require('./db');
const fileDb = new db.FileDb(`${__dirname}/`);
const store = new db.Db(fileDb, ['account', 'tweet', 'delete', 'template']);
module.exports = store;
