//
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let ProductoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
    descripcion: { type: String, required: false },
    img: { type: String, required: false },
    estado: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' }
}, {
    timestamps: true
});


module.exports = mongoose.model('Producto', ProductoSchema);