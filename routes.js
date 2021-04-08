const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/articulo/:id", (req, res) => {});

router.get("/administrador", (req, res) => {
  res.render("admin");
});

router.post("/administrador", (req, res) => {});

module.exports = router;
