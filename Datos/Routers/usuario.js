//

const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../Models/usuario.models');
const { verifyToken, verifyAdmin } = require('../Middlewares/Auth.middleware');

const app = express();


app.get('/datos', verifyToken, (req, res) => {

    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    })*/

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email img estado role google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })

            })


        })

});



app.post('/datos', [verifyToken, verifyAdmin], (req, res) => {


    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }



        res.json({
            ok: true,
            usuario: usuarioDB,
        });


    });


});



app.put('/datos/:id', [verifyToken, verifyAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});




app.delete('/datos/:id', [verifyToken, verifyAdmin], function(req, res) {
    let id = req.params.id;

    //Operador.findByIdAndRemove(id, (err, operadorBorrado) => {

    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ' Operador no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;