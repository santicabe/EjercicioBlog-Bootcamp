const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

router.get("/gracias", (req, res) => {
  res.render("gracias");
});

router.get("/home", home.showHome);

router.get("/articulo/:id", home.showArticle);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/administrador", admin.adminList);

router.post("/administrador", admin.createArticle);

router.get("/delete/:id", admin.deleteArticle);

router.post("/administrador/update", admin.updateArticle);

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

module.exports = router;
