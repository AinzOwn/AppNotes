//Esquema de las notas
const mongoose = require('mongoose');
const {Schema} = mongoose;

const EsquemaNota = new Schema ({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nota', EsquemaNota)