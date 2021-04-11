const customQuery = require("../customQuery");

class Article {
  id;
  titulo;
  contenido;
  imagen;
  fechaDeCreacion;
  autorNombre;
  autorApellido;
  autorEmail;
  static async findAll() {
    const result = await customQuery(
      "SELECT * FROM articulos ORDER BY fechaDeCreacion DESC"
    );
    return result;
  }

  static async listByid() {
    const result = await customQuery("SELECT * FROM articulos ORDER BY id");
    return result;
  }

  save() {}

  static async findById(id) {
    const result = await customQuery("SELECT * FROM articulos WHERE id =" + id);
    return result[0];
  }
  static find(fields) {}
  update() {}
  delete() {}
}

module.exports = Article;
