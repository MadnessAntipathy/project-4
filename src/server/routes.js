module.exports = (app, db) => {
  const main = require('./controllers/main')(db);
  app.post('/create', main.create);
  app.post('/login', main.login);
  app.post('/score', main.score);
  app.post('/submitscore', main.submit);

};
