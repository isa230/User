//
const express = require('express');
const app = express();



// Routa de Usuario
app.use(require('./usuario'));

//Ruta Login
app.use(require('./Login'));

//Ruta Categorias
app.use(require('./Cateregoria'));

//Ruta Producto
app.use(require('./Producto'));

//Ruta subir archivo

app.use(require('./uploads'));

//Ruta img
app.use(require('./imagenes'));


module.exports = app;