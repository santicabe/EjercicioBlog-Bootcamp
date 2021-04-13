require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");

const { render } = require("ejs");

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
