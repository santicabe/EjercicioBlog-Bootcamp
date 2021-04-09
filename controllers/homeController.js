const findAll = require("../models/Article");

const showHome = (req, res) => {
  findAll(function (articulos) {
    res.render("home", { articulos });
  });
};

module.exports = { showHome };
