const table = require("../db/models/sequelize");
const Article = require("../db/models/Article");

const showHome = async (_req, res) => {
  const articulos = await table.Article.findAll();
  console.log(articulos[0].title);
  res.render("home", { articulos });
};

const showArticle = async (req, res) => {
  id = req.params.id;
  const articulo = await table.Article.findByPk(id);

  res.render("articulo", { articulo });
};

module.exports = { showHome, showArticle };
