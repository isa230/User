// subir archv , creo carp afue y esta fileupload

const express = require('express');

const fileUpload = require('express-fileupload');

const Usuario = require('../Models/usuario.models');
const Producto = require('../Models/Producto.models');

const fs = require('fs');

const path = require('path');

const app = express();



// default options, puedo poner conf dentro 
app.use(fileUpload());

//es un post pero necesit q modifique cosas x put
//: tipo es de si usua.. o produ + el id de ellos

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: ' No se ha seleccionado ningun archivo'
            }
        });

    }

    //VALIDACION DE TIPOS 

    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) { //lo mismo q enel de abajo
        return res.status(400).json({
            ok: false,
            err: {
                msg: 'Los tipos validos son ' + tiposValidos.join(', ')

            }
        })
    }


    //est  vien del input le cambie en nombre samplefile por y asilo llamo en potm
    let archivo = req.files.archivo;

    //EXTENCIIONES PERMITIDAS
    let extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreCortado = archivo.name.split('.'); // el esplit separ apor punto 
    let extencion = nombreCortado[nombreCortado.length - 1]; //para obtener la posicion
    //console.log(extencion);// prueva en la clg para el nombre jpg

    if (extencionesValidas.indexOf(extencion) < 0) { //si extencion es menor a cero

        return res.status(400).json({
            ok: false,
            err: {
                msg: 'Las extenciones permitidas son ' + extencionesValidas.join(', '), // concatenar las respuesta 
                ext: extencion
            }
        })

    }

    //CAMBIAR NOMBRE AL ARCHICVO
    //esto es par adarle un nombre diferente ala img o lo q sea por eso ek del medio q da unos numero finales mas id y la extencion
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extencion }`




    //es apra move el arcv al directorio el nombre archivo puedoponer lo q quiera y la ruta la cambio para q la guarde, tambien temple literale para 
    //q guarde el arcgivo con su respetivo name, mas donde se guarda si usuario o producto


    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => { // el nombre de arcgivo .naem q esta el la linea 31
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        //un json de respuesta pra  provar mientras
        // como son dos con una condicio se puede si fueran mas se usa un swits

        if (tipo === 'usuarios') {

            imagenUsuario(id, res, nombreArchivo);

        } else {

            imagenProducto(id, res, nombreArchivo);

        }


    });
});

//Aqui, img cargada  par cambiar fot de user o perfil
//verificar si el usuario existe  con el id

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {

            borrarArchivo(nombreArchivo, 'usuarios')

            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario no existe'
                }
            });
        }


        borrarArchivo(usuarioDB.img, 'usuarios')



        usuarioDB.img = nombreArchivo;

        //guardad en Db
        usuarioDB.save((err, usuarioGuardado) => {

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });

        });

    });

}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borrarArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {

            borrarArchivo(nombreArchivo, 'productos')

            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'producto no existe'
                }
            });
        }


        borrarArchivo(productoDB.img, 'productos')



        productoDB.img = nombreArchivo;

        //guardad en Db
        productoDB.save((err, productoGuardado) => {

            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });

        });

    });

}


function borrarArchivo(nombreImagen, tipo) {
    //path par aver la ruta de la ims desd la routes y borra img si ya exite pa eso es faly sisten
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }


}

module.exports = app