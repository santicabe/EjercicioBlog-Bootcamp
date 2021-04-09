const sql = require("mysql2");

const customQuery = (sqlString, callback) => {
  const connection = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  connection.connect(function (err) {
    if (err) console.log("No conecta");
    console.log("Nos conectamos a la BD!");
  });

  connection.query(sqlString, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
      callback(data);
    }
  });

  connection.end();
};

module.exports = customQuery;
