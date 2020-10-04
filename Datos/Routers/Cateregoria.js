//
const express = require('express');

//const _ = require('underscore');

const { verifyToken, verifyAdmin } = require('../Middlewares/Auth.middleware');
const { json } = require('body-parser');

const Categoria = require('../Models/Categoria.models');

const app = express();


app.post('/categoria', verifyToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id //muetra el id el post de el logeado
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});

app.get('/categoria', verifyToken, (req, res) => {

    Categoria.find({})
        .populate('Usuario', 'nombre email') //datos de useer 
        .sort('descripcion') //orden por descripcion
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            })
        })
});

app.get('/categoria/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    //let categoria = req.categoria;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return Res.status(400).json({
                ok: true,
                err: {
                    msg: 'El id no es valido'
                }
            });
        }
        res.json({
            ok: true,
            catergoria: categoriaDB
        });
    });

});

app.put('/categoria/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400), json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

app.delete('/categoria/:id', [verifyToken, verifyAdmin], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ' El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    })

});


module.exports = app;