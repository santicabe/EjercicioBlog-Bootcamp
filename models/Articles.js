const customQuery = require("../customQuery");
//const { all } = require("../routes");

const findAll = (callback) => {
  customQuery(
    "SELECT * FROM articulos ORDER BY fechaDeCreacion",
    function (resultados) {
      callback(resultados);
    }
  );
};

console.log("hols");

module.exports = findAll;