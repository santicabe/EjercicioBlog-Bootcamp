const Article = require("../models/Article");
const formidable = require("formidable");

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
  const img = req.body.img;
  await Article.save(
    titulo,
    contenido,
    "fecha",
    autorNombre,
    autorApellido,
    email,
    img
  );
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/public/img",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    res.redirect("home");
  });
};

module.exports = { adminList, createArticle };
