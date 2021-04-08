const sql= require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"ejercicio21"
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("nos conectamos a la BD")
})

connection.query("SELECT * FROM articulos", (err, result) => {

  if(err) {
    throw err
  } else {
    console.log(result)
  }
}