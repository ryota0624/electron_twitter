module.exports = (app, server, passport) => {
  app.get('/', (req, res) => {
    res.send(template());
  });
};
