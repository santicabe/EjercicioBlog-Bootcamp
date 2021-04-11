const Article = require("../models/Article");

const adminList = async (_req, res) => {
  const articulos = await Article.listByid();

  res.render("admin", { articulos });
};

const createArticle = async (req, res) => {
  const titulo = req.body.title;
  const contenido = req.body.content;
  const autorNombre = req.body.authorName;
  const autorApellido = req.body.authorLastname;
  const email = req.body.authorEmail;
  await Article.save(
    titulo,
    contenido,
    "fecha",
    autorNombre,
    autorApellido,
    email,
    "img"
  );

  res.render("gracias");
};

module.exports = { adminList, createArticle };
