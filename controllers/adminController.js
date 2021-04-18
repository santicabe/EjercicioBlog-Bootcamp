const table = require("../db/models");
const formidable = require("formidable");
const fs = require("fs");

const adminList = async (_req, res) => {
  const articulos = await table.Article.findAll();
  const authors = await table.Author.findAll();

  res.render("admin", { articulos, authors });
};

const showUpdate = async (req, res) => {
  const id = req.params.id;
  const article = await table.Article.findByPk(id);
  res.render("update", { article });
};

const createArticle = async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: process.cwd() + "/public/img",
    keepExtensions: true,
  });
  form.parse(req, async (arr, fields, files) => {
    let imgDir = files.image.path.split(`\\`).slice(-1).toString();
    table.Article.create({
      title: fields.title,
      content: fields.content,
      authorId: fields.authorId,
      image: imgDir,
    });
  });
  res.redirect("/gracias");
};

const updateArticle = async (req, res) => {
  const title = req.body.titleChange;
  const content = req.body.contentChange;
  /* const image = req.body.imgChange; */
  const id = req.params.id;

  table.Article.findByPk(id).then((article) => {
    article.update({
      title: title,
      content: content,
    });
  });

  res.redirect("/gracias");
};

const deleteArticle = async (req, res) => {
  id = req.params.id;

  data = await table.Article.findByPk(id);
  imgPath = process.cwd() + "/public/img/" + data.image;
  fs.unlink(imgPath, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Se borró el archivo");
    }
  });

  await table.Article.destroy({ where: { id: id } });

  res.redirect("/home");
};

module.exports = {
  adminList,
  createArticle,
  deleteArticle,
  updateArticle,
  showUpdate,
};
