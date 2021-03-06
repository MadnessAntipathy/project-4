module.exports = (db) => {

  let create = (request, response) => {

      db.database.create(request.body, (error, info) => {
        if (error) {
          console.error('error getting pokemon', error);
          response.status(500);
          response.send('server error');
        } else {
          if( info === null ){
            response.status(404);
            response.send('not found');
          }else{

            // console.log(info)
            response.cookie('id',info[0].id)
            response.cookie('username',info[0].name)
            // response.clearCookie('id', {path:'/'})
            // response.clearCookie('user_name', {path:'/'})
            // response.render('pokemon/show', { pokemon: pokemon });
            response.send(info)
          }
        }
      });
  };

  let score = (request, response) => {
      db.database.score(request.body, (error, info) => {
        if (error) {
          console.error('error getting pokemon', error);
          response.status(500);
          response.send('server error');
        } else {
          if( info === null ){
            response.send(null);
          }else{
            response.send(info)
          }
        }
      });
  };

  let login = (request, response) => {

      db.database.login(request.body, (error, info) => {
        if (error) {
          console.error('error getting pokemon', error);
          response.status(500);
          response.send('server error');
        } else {
          if( info === null ){
            response.status(404);
            response.send('not found');
          }else{
            if (info.length > 0){
              response.cookie('id',info[0].id)
              response.cookie('username',info[0].name)
            }
            // response.clearCookie('id', {path:'/'})
            // response.clearCookie('user_name', {path:'/'})
            response.send(info)
          }
        }
      });
  };

  let submit = (request, response) => {

      db.database.submit(request.body, (error, info) => {
        if (error) {
          console.error('error getting pokemon', error);
          response.status(500);
          response.send('server error');
        } else {
          if( info === null ){
            response.status(404);
            response.send('not found');
          }else{
            if (info.length > 0){
              response.cookie('id',info[0].id)
              response.cookie('username',info[0].name)
            }

            response.send(info)
          }
        }
      });
  };

  return {
    create : create,
    score: score,
    login: login,
    submit: submit,
  }

};
