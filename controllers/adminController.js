const table = require("../db/models");
const { Article, Coment, Author } = require("../db/models");
const article = require("../db/models/article");
const author = require("../db/models/author");

const adminList = async (_req, res) => {
  const articulos = await table.Article.findAll();
  const authors = await table.Author.findAll();

  res.render("admin", { articulos, authors });
};

const createArticle = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image;
  const authorId = req.body.authorId;
  console.log("title", req.body);
  try {
    await table.Article.create({
      title: title,
      content: content,
      image: image,
      authorId: authorId,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/gracias");
};

const updateArticle = async (req, res) => {
  //hay que escribir la logica para que el author que creo el articulo sea el
  //mismo que esta logueado y el solo lo pueda editar
  //articleId
  // article.authorId === req.user.id que seria el id del usuario logueado
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

  await table.Article.destroy({ where: { id: id } });

  res.redirect("/home");
};

module.exports = { adminList, createArticle, deleteArticle, updateArticle };
