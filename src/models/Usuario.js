const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const EsquemaUsuario = new Schema({
    usuario: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});


EsquemaUsuario.methods.encryptPassword = async(contrasena) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(contrasena, salt);
    return hash;
};
EsquemaUsuario.methods.matchPassword = async function(contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', EsquemaUsuario);