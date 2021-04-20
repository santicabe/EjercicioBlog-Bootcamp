const table = require("../db/models");
const Article = require("../db/models/article");

const showHome = async (_req, res) => { 
  const articulos = await table.Article.findAll();
  res.render("home", { articulos });
};

const showArticle = async (req, res) => {
  id = req.params.id;
  const articulo = await table.Article.findByPk(id);
  const author = await articulo.getAuthor();
  console.log("articulo", articulo);
  console.log("author", articulo.getAuthor());
  console.log("author_id", articulo.authorid);
  res.render("articulo", { articulo, author });
};

module.exports = { showHome, showArticle };
