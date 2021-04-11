const Article = require("../models/Article");

const showHome = async (_req, res) => {
  const articulos = await Article.findAll();
  res.render("home", { articulos });
};

const showArticle = async (req, res) => {
  id = req.params.id;
  const articulo = await Article.findById(id);
  res.render("articulo", { articulo });
};

module.exports = { showHome, showArticle };
