const router = require('express').Router();

const Usuario = require('../models/Usuario');

const passport = require('passport');

router.get('/usuarios/registro', (req, res) =>{
    res.render('usuarios/registro');
});
router.post('/usuarios/registro', async (req, res) =>{
    const { usuario, correo, contrasena, confirm_contrasena } = req.body;
    const error = [];

    if (usuario == 0) {
        error.push({text: 'Ingresa un Usuario'});
    }
    if (correo == 0) {
        error.push({text: 'Ingresa un Correo'});
    }
    if (contrasena.length < 4) {
        error.push({text: 'La Contraseña debe tener al menos 4 digitos'});
    }
    if (contrasena != confirm_contrasena) {
        error.push({text: 'Las Contraseñas no coinciden'});
    }
    if (error.length > 0) {
        res.render('usuarios/registro', {error, usuario, correo, contrasena, confirm_contrasena});
    }else{
        const correoUsuario = await Usuario.findOne({correo: correo});
        if (correoUsuario) {
            req.flash('error_msg', 'El correo ya esta en uso..');
            res.redirect('/usuarios/registro');
        }
        const nuevoUsuario = new Usuario({ usuario, correo, contrasena });
        nuevoUsuario.contrasena = await nuevoUsuario.encryptPassword(contrasena);
        await nuevoUsuario.save();
        req.flash('perfecto_msg', 'Perfecto, estas registrado');
        res.redirect('/usuarios/login');
    }
})


router.get('/usuarios/login', (req, res) =>{
    res.render('usuarios/login');
});
router.post('/usuarios/login', passport.authenticate('local', {
    successRedirect: '/notas',
    failureRedirect: '/usuarios/login',
    failureFlash: true
}));

router.get('/usuarios/cerrar-sesion', (req,res) =>{
    req.logout();
    res.redirect('/');
});

module.exports = router;