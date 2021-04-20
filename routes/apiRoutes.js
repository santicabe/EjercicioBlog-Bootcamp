const table = require("../db/models");
const Article = require("../db/models/article");
const Author = require("../db/models/author");
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

// Ruta que brinda todos los articulos

router.get("/api/articles", async (req, res) => {
  const articulos = await table.Article.findAll();
  res.json(articulos);
});

// Ruta que brinda articulo por ID

router.get("/api/articles/:id", async (req, res) => {
  id = req.params.id;
  const articulo = await table.Article.findByPk(id);
  res.json(articulo);
});

// Ruta que brinda articulo por autor

router.get("/api/author/:id", async (req, res) => {
  id = req.params.id;
  const articulos = await table.Article.findAll({
    where: {
      authorId: id,
    },
  });
  res.json(articulos);
});

// Ruta que brinda articulo por palabra en el titulo

router.get("/api/article-title/:title", async (req, res) => {
  title = req.params.title;
  const articulos = await table.Article.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });
  res.json(articulos);
});

// Ruta que crea un articulo

router.post("/api/articles/create-post", async (req, res) => {
  const newArticle = req.body.title;
  console.log(req.body.title);
  const articulos = await table.Article.create(newArticle);
  res.json(articulos);
});

module.exports = router;
