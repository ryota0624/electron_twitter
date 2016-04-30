const express = require('express');
const app = express();
const http = require('http');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport');

const server = http.createServer(app);
const routing = require('./routing/route.js');
const db = require('./db/store');
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}'/../public`));
app.use(cookie());
app.use(session({
  secret: 'sut',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: null,
  },
}));

routing(app, server, passport);

const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  // console.log(socket);
});

const twitter = require('./twitter');
twitter.onStream((tweet, account) => {
  io.sockets.emit('tweet', { tweet, account });
});
// twitter.onStream((tweet) => console.log(tweet));

module.exports = (cb) => {
  db.init().then(() => db.load('account'))
    .then((accounts) => {
      const keys = Object.keys(accounts);
      return keys.forEach(key => twitter.setAccount(key, accounts[key], { setStream: true }));
    })
    .then(() => server.listen(3000, () => cb())).catch(err => console.log(err));
};


