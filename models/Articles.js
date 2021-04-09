const sql = require("mysql2");

const home = () => {
  const connection = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  connection.connect(function (err) {
    if (err) console.log("No conecta");
    console.log("nos conectamos a la BD");
  });

  connection.query("SELECT * FROM articulos", (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result[2].titulo);
    }
  });

  connection.end();
};

module.exports = home;
console.log();
