const table = require("../db/models");
const Article = require("../db/models/article");

const showHome = async (_req, res) => {
  const articulos = await table.Article.findAll();
  res.render("home", { articulos });
};

const showArticle = async (req, res) => {
  id = req.params.id;
  const articulo = await table.Article.findByPk(id);

  res.render("articulo", { articulo });
};

module.exports = { showHome, showArticle };
