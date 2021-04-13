const customQuery = require("../customQuery");
const formidable = require("formidable");
const path = require("path");

function getPath(path) {
  let newPath = path.substring(path.lastIndexOf("\\") + 1);
  return newPath;
}

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

  static async save(req) {
    const form = formidable({
      multiples: true,
      uploadDir: path.join(__dirname, "..", "public", "img"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
      }
      let { titulo, contenido, fecha, nombre, apellido, email } = fields;
      let imageName = getPath(files.image.path);
      return await customQuery(`INSERT INTO articulos (titulo, contenido, fechaDeCreacion, autorNombre, autorApellido, autorEmail, imagen) VALUES
    ("${titulo}", "${contenido}", "${fecha}", "${nombre}", "${apellido}", "${email}", "${imageName}" )`);
    });
  }

  static async findById(id) {
    const result = await customQuery("SELECT * FROM articulos WHERE id =" + id);
    return result[0];
  }

  static find(fields) {}

  static async update(
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
      SET titulo = "${tituloN}",
      contenido = "${contenidoN}",
      fechaDeCreacion = "${fechaN}",
      autorNombre = "${nombreN}",
      autorApellido = "${apellidoN}",
      autorEmail = "${emailN}",
      imagen = "${imgN}"
      WHERE id = ${id}`);
  }

  static async delete(id) {
    await customQuery(`DELETE FROM articulos WHERE id= ${id}`);
  }
}

module.exports = Article;
