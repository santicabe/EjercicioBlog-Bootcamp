const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("home");
});

router.get("/articulo/:id", (req, res) => {});

router.get("/administrador", (req, res) => {
  res.send("administrador");
});

router.post("/administrador", (req, res) => {});

module.exports = router;
