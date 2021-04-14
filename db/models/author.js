module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Author;
};
