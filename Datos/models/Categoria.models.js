//

const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: [true, 'Es cobligatoria la descripcion'], require: [true, 'La categoria es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

//categoriaSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser unico' });


module.exports = mongoose.model('Categoria', categoriaSchema);