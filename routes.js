const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");
const auth = require("./controllers/authController");

router.use((req, res, next) => {
  //middleware para psarle al front el objecto currentUser
  res.locals.currentUser = req.user;
  next();
});

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

router.get("/login", auth.login);

router.post("/login", auth.authenticate);

router.get("/register", auth.register);

router.post("/register", auth.store);

router.get("/logout", auth.logout);

router.get("/administrador", auth.isLoggedIn, admin.adminList); //te deja pasar o no

router.post("/administrador", auth.isLoggedIn, admin.createArticle); //te deja pasar o no

router.get("/delete/:id", auth.isLoggedIn, admin.deleteArticle); //te deja pasar o no

router.post("/administrador/update", auth.isLoggedIn, admin.updateArticle); //te deja pasar o no

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

module.exports = router;
