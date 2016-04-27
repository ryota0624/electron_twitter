const twitterAouth = require('./twitterAouth');
const timeLine = require('./timeLine');
const twitter = require('./tweet');
module.exports = (app, server, passport) => {
  timeLine(app, server, passport);
  twitter(app, server, passport);
  twitterAouth(app, server, passport);
};
