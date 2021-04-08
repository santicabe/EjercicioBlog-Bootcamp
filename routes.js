const express = require("express");
const router = express.Router();
const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "Local Host"
  user: "root"
  password: "root"
  database:"ejercicio21"
})

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/home", (req, res) => {
  connection.query("SELECT * FROM articulos", (err, result) => {

    if(err) {
      throw err
    } else {

    }

  })
  res.render("home");
});






router.get("/articulo/:id", (req, res) => {});

router.get("/administrador", (req, res) => {
  res.render("admin");
});

router.post("/administrador", (req, res) => {});

module.exports = router;
