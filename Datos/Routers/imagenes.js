//

const express = require('express');

// por si existe o no la img
const fs = require('fs');
const path = require('path');

const { verificaTokenImg } = require('../Middlewares/Auth.middleware');


const app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`); // para ver si existo de no estar mando el noImg

    if (fs.existsSync(pathImagen)) {

        res.sendFile(pathImagen);

    } else {

        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        //una condicion q devuelva una img o lo q sea en el caso de no quere o rr del user
        //creo un assets: es par aalmacenamos recurso estatico, imga estilos info q va a hacer golblar 
        // regresar el archivo q no sea el json
        //y como la img no esta en una carpeta plubic hay una funcion 

        res.sendFile(noImagePath);

    }









})


module.exports = app;