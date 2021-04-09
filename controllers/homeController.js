const findAll = require("../models/Articles");

const allArticles = (req, res) => {
  findAll(function (articulos) {
    console.log(articulos);
  });
  res.render("home", { articulos });
};
