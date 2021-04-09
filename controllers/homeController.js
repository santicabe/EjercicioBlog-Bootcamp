const findAll = require("../models/Articles");

findAll();

const AllArticles = (req, res) => {
  const articles = findAll();
  res.render("home", { articles });
};
