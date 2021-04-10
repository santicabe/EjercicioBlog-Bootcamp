const Article = require("../models/Article");

const showHome = async (req, res) => {
  const articulos = await Article.findAll();
  res.render("home", { articulos });
};

const showArticle = async (req, res) => {
  id = req.params.id;
  const articulo = Article.findById(id);
  res.render("article", { articulo });
};

module.exports = { showHome, showArticle };
