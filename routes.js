const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");

router.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

router.get("/home", home.showHome);

router.get("/articulo/:id", home.showArticle);

router.get("/administrador", admin.adminList);

router.post("/administrador", admin.createArticle);

router.get("/delete/:id", admin.deleteArticle);

module.exports = router;
