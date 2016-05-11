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
function tweetReceive({ tweet, account }) {
  io.sockets.emit('tweet', { tweet, account });
  const saveTweet = Object.assign({}, tweet, { reseivedAccount: account });
  db.save('tweet', tweet.id_str, saveTweet).catch(err => console.log(err));
}

twitter.onStream((tweet, account) => {
  const retweeted = tweet.retweeted_status;
  tweetReceive({ tweet, account });
  if (retweeted) {
    console.log(retweeted)
    tweetReceive({ tweet: retweeted, account });
  }
}, 'tweet', { setStream: true });

twitter.onStream((tweet) => {
  db.save('delete', tweet.delete.status.id_str, tweet.delete.status).catch(err => console.log(err));
  db.load('tweet').then(tweets => {
    console.log(tweets[tweet.delete.status.id_str]);
  });
}, 'delete', { setStream: true });

twitter.onStream(data => {
  console.log('reconnect', data);
  twitter.start();
}, 'reconnect', { setStream: true });

exports.streamOn = twitter.onStream.bind(twitter);

const serverInit = (cb, options) => {
  db.init().then(() => db.load('account'))
    .then((accounts) => {
      const keys = Object.keys(accounts);
      return keys.forEach(key => twitter.setAccount(key, accounts[key],
        { setStream: options.stream }));
    })
    .then(() => server.listen(3000, () => cb())).catch(err => console.log(err));
};

exports.serverInit = serverInit;

