const sql = require("mysql2/promise");

const customQuery = async (sqlString, fields) => {
  const connection = await sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  const [data] = await connection.execute(sqlString, fields);
  console.log(sqlString);

  connection.end();
  return data;
};

module.exports = customQuery;
