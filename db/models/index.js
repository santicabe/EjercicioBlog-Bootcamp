const { Sequelize, Model, DataTypes } = require("sequelize");
const ArticleModel = require("./article.js");
const ComentModel = require("./coment.js");
const AuthorModel = require("./author.js");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const Article = ArticleModel(sequelize, Sequelize);
const Coment = ComentModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);

Article.hasMany(Coment);

Article.belongsTo(Author);

Coment.belongsTo(Article);

Author.hasMany(Article);

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Coment,
  Author,
};
