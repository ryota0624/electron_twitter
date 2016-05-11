const remote = require('electron').remote;
const db = remote.require('./server/db/store');
export default db;