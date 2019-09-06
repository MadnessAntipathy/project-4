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
    let queryString = "SELECT * FROM scores INNER JOIN users ON (users.id = scores.userid)"
    dbPoolInstance.query(queryString,(error, queryResult) => {
      if( error ){
        console.log("query error", error)
        callback(error, null);
      }else{
        callback(null, queryResult.rows);
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

  return {
    create,
    score,
    login,
  };
};
