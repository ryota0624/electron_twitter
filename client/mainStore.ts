const remote = require('electron').remote;
const storeFn = remote.require('./mainProcess/store');
export default storeFn.storeInit;