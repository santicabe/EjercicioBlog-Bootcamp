const table = require("../db/models");
const Article = require("../db/models/article");

const adminList = async (_req, res) => {
  const articulos = await table.Article.findAll();

  res.render("admin", { articulos });
};

const createArticle = async (req, res) => {
  await Article.save(req);

  res.redirect("/gracias");
};

const updateArticle = async (req, res) => {
  const id = req.body.idChange;
  const titulo = req.body.titleChange;
  const contenido = req.body.contentChange;
  const autorNombre = req.body.authorNameChange;
  const autorApellido = req.body.authorLastnameChange;
  const email = req.body.authorEmailChange;
  await Article.update(
    id,
    titulo,
    contenido,
    "fecha",
    autorNombre,
    autorApellido,
    email,
    "img"
  );

  res.redirect("/gracias");
};

const deleteArticle = async (req, res) => {
  id = req.params.id;
  await Article.delete(id);

  res.redirect("/home");
};

module.exports = { adminList, createArticle, deleteArticle, updateArticle };
