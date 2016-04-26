const twitterAouth = require('./twitterAouth');
const timeLine = require('./timeLine');
module.exports = (app, server, passport) => {
  timeLine(app, server, passport);
  twitterAouth(app, server, passport);
};
