module.exports = (app, db) => {
  const main = require('./controllers/main')(db);
  app.post('/create', main.create);
  app.post('/login', main.login);
  app.get('/score', main.score);

};
