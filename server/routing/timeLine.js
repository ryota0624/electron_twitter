const fs = require('fs');
const Handlebars = require('handlebars');
const template = Handlebars.compile(fs.readFileSync(`${__dirname}/view.html`).toString());
const db = require('../db/store');

module.exports = (app, server, passport) => {
  app.get('/', (req, res) => {
    db.load('account').then(accounts => {
      const accountStr = JSON.stringify(accounts);
      res.send(template({ accounts: accountStr }));
    });
  });
};
