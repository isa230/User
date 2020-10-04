const { json } = require('body-parser');
//
const express = require('express');
const { result } = require('underscore');

const { verifyToken } = require('../Middlewares/Auth.middleware');

const Producto = require('../Models/Producto.models');

const app = express();




app.post('/productos', verifyToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id, //muestra el id del user q crea algo 
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        estado: body.estado
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })

    })

});

app.get('/productos', verifyToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ estado: true })
        .skip(desde)
        .limit(5)
        //.populate('usuario', 'nombre email')
        //.populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});


//buscar producto buscar para no confundir con el id y termino atraves del url
app.get('/productos/buscar/:termino', verifyToken, (req, res) => {
    //termino de buscs por palabras
    let termino = req.params.termino;

    //exprewcion regular RegeExp es de js, la 'i' para q sea sencible alas M m
    let regex = new RegExp(termino, 'i')


    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });


});


app.get('/productos/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        // .populate('usuario', 'nombre email')
        // .populate('Categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Id no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });






});

app.put('/productos/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        } //actualizar prod

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.nombre = body.nombre;
        productoDB.estado = body.estado;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })

        })


    });

});

app.delete('/productos/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: true,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        //cabiar el estado en bd y en el find 
        productoDB.estado = false;

        //guardar cambio
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: true,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'producto borrado'

            });

        });

    });
});



module.exports = app;