/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let create = (info, callback) => {
    var usableData  = JSON.parse(info.data)
    let queryString = "INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *;"
    let values = [usableData.username,usableData.password]
    dbPoolInstance.query(queryString, values, (error, queryResult) => {
      if( error ){
        console.log("query error", error)
        callback(error, null);
      }else{
        callback(null, queryResult.rows);
      }
    });
  };

  let score = (info, callback) => {
    var usableData  = JSON.parse(info.data)
    let queryString = "SELECT * FROM scores INNER JOIN users ON (users.id = scores.userid) ORDER BY scores DESC LIMIT 50"
    dbPoolInstance.query(queryString,(globalError, globalQuery) => {
      if( globalError ){
        console.log("query error", globalError)
        callback(globalError, null);
      }else{
        let nextQueryString = "SELECT * FROM scores INNER JOIN users ON (users.id = scores.userid) WHERE scores.userid=$1 ORDER BY scores DESC LIMIT 50"
        let value = [usableData.userId]
        dbPoolInstance.query(nextQueryString,value,(personalError, personalQuery)=>{
          if (personalError){
            callback(personalError, null);
          }else{
            var data = {
              globalQuery:globalQuery.rows,
              personalQuery:personalQuery.rows
            }
            callback(null, data);
          }
        })
      }
    });
  };

  let login = (info, callback) => {
    var usableData  = JSON.parse(info.data)
    let queryString = "SELECT * FROM users WHERE (name=$1 AND password=$2)"
    let values = [usableData.username,usableData.password]
    dbPoolInstance.query(queryString, values,(error, queryResult) => {
      if( error ){
        console.log("query error", error)
        callback(error, null);
      }else{
        callback(null, queryResult.rows);
      }
    });
  };

  let submit = (info, callback) => {
    var usableData  = JSON.parse(info.data)
    let queryString = "INSERT INTO scores (userid,scores) VALUES ($1,$2) RETURNING *;"
    let values = [usableData.userId,usableData.score]
    dbPoolInstance.query(queryString, values, (error, queryResult) => {
      if( error ){
        console.log("query error", error)
        callback(error, null);
      }else{
        callback(null, queryResult.rows);
      }
    });
  };

  return {
    create,
    score,
    login,
    submit,
  };
};
