const express = require("express");
const app = express();
const routes = require("./routes");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
