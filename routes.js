const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/homeController");

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/articulo/", (req, res) => {
  res.render("articulo");
});

router.get("/administrador", (req, res) => {
  res.render("admin");
});

router.post("/administrador", (req, res) => {});

module.exports = router;
