const TWITTER_CONSUMER_KEY = process.env.keyc ?
  process.env.keyc : require('./key').twitter.consumer;
const TWITTER_CONSUMER_SECRET = process.env.keys ?
  process.env.keys : require('./key').twitter.secret;
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const hostname = 'http://localhost:3000';

const db = require('./db/store');
const twitter = require('./twitter');
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `${hostname}/login/cb`,
},
  (token, tokenSecret, profile, done) => {
    passport.session.id = profile.id;
    const tokenProfile = Object.assign({}, profile, { token, tokenSecret });
    twitter.setAccount(profile.id, tokenProfile, { setStream: true });
    db.save('account', profile.id, tokenProfile).then(() => done(null, tokenProfile))
      .catch(err => console.log(err));
  }
));

module.exports = passport;
