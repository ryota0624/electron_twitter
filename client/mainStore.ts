const remote = require('electron').remote;
const storeFn = remote.require('./mainProcess/store');
console.log(storeFn)
export default storeFn.storeInit;