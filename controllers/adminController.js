const Article = require("../models/Article");

const adminList = async (_req, res) => {
  const articulos = await Article.listByid();

  res.render("admin", { articulos });
};

module.exports = { adminList };
