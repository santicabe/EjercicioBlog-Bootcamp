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

  static async save(titulo, contenido, fecha, nombre, apellido, email, img) {
    await customQuery(`INSERT INTO articulos (titulo, contenido, fechaDeCreacion, autorNombre, autorApellido, autorEmail, imagen) VALUES
    ("${titulo}", "${contenido}", "${fecha}", "${nombre}", "${apellido}", "${email}", "${img}" )`);
  }

  static async findById(id) {
    const result = await customQuery("SELECT * FROM articulos WHERE id =" + id);
    return result[0];
  }

  static find(fields) {}

  async update(
    id,
    tituloN,
    contenidoN,
    fechaN,
    nombreN,
    apellidoN,
    emailN,
    imgN
  ) {
    await customQuery(`UPDATE articulos 
      SET titulo = ${tituloN},
      contenido = ${contenidoN},
      fechaDeCreacion = ${fechaN},
      autorNombre = ${nombreN},
      autorApellido = ${apellidoN},
      autorEmail = ${emailN},
      imagen = ${imgN}
      WHERE id = ${id}`);
  }

  static async delete(id) {
    await customQuery(`DELETE FROM articulos WHERE id= ${id}`);
  }
}

module.exports = Article;
