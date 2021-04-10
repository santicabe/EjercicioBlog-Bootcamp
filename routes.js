const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/home", home.showHome);

router.get("/articulo/:id", home.showArticle);

router.get("/administrador", (req, res) => {
  res.render("admin");
});

router.post("/administrador", (req, res) => {});

module.exports = router;
