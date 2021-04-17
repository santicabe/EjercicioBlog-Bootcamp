const Author = require("./author.js");

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Article;
};
