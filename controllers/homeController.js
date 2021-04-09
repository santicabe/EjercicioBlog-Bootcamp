const findAll = require("../models/Articles");

const showHome = (req, res) => {
  findAll(function (articulos) {
    res.render("home", { articulos });
  });
};

module.exports = { showHome };
