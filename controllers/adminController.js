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
    authorEmail,
    "img"
  );

  res.render("gracias");
};

const deleteArticle = async (req, res) => {
  id = req.params.id;
  await Article.delete(id);

  res.redirect("/home");
};

module.exports = { adminList, createArticle, deleteArticle };
