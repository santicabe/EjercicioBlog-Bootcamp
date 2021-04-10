const customQuery = require("../customQuery");

/* class Article {
  id;
  titulo;
  contenido;
  imagen;
  fechaDeCreacion;
  autorNombre;
  autorApellido;
  autorEmail;
  static findAll() {

  } 
  save(){}
  static findById() {}
  static find(fields) {}
  update (){}
  delete () {}
}
 */

const findAll = async (callback) => {
  const result = await customQuery(
    "SELECT * FROM articulos ORDER BY fechaDeCreacion DESC"
  );
  return result;
};

module.exports = findAll;
