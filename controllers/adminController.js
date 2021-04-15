const table = require("../db/models");
const { Article, Coment, Author } = require("../db/models");
const article = require("../db/models/article");
const author = require("../db/models/author");

const adminList = async (_req, res) => {
  const articulos = await table.Article.findAll();

  res.render("admin", { articulos });
};

const createArticle = async (req, res) => {
  await Article.create(req.body);
  //ojo que deben instalar formidable y usar sus metodos y propiedades de fields y files
  //y el req.body no anda con formidable
  res.redirect("/gracias");
};

const updateArticle = async (req, res) => {
  //hay que escribir la logica para que el author que creo el articulo sea el
  //mismo que esta logueado y el solo lo pueda editar
  //articleId
  // article.authorId === author.id que seria el id del usuario logueado
  console.log("info del usuario logueado", req.isAuthenticated());
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
