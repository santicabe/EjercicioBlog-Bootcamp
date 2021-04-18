const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const home = require("./controllers/articleController");
const admin = require("./controllers/adminController");
const auth = require("./controllers/authController");
const passport = require("passport");

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

router.get("/administrador", auth.isLoggedIn, admin.adminList);

router.post("/administrador", auth.isLoggedIn, admin.createArticle); //te deja pasar o no

router.get("/delete/:id", auth.isLoggedIn, admin.deleteArticle); //te deja pasar o no

router.get("/update/:id", auth.isLoggedIn, admin.showUpdate); //te deja pasar o no

router.post("/update/:id", auth.isLoggedIn, admin.updateArticle); //te deja pasar o no

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

router.get("/login", auth.login);

router.post("/login", auth.authenticate);

router.get("/register", auth.register);

router.post("/register", auth.store);

router.get("/logout", auth.logout);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/administrador",
    failureRedirect: "/login",
  })
);

module.exports = router;
