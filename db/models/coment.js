module.exports = (sequelize, DataTypes) => {
  const Coment = sequelize.define("coment", {
    coment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Coment;
};
