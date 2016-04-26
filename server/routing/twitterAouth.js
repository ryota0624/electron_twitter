module.exports = (app, server, passport) => {
  app.get('/login', passport.authenticate('twitter'));
  app.get('/login/cb', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  }));
};
