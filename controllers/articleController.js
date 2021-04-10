const findAll = require("../models/Article");

const showHome = async (req, res) => {
  const articulos = await findAll();
  res.render("home", { articulos });
};

module.exports = { showHome };
